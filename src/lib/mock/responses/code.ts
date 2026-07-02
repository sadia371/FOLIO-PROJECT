import { ModuleResponse } from "@/types";

export const sampleCode = `import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async generateTokens(userId: string, role: string) {
    const payload = { sub: userId, role };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 3600, // hardcoded — should be configurable
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });
    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      });
      // No rotation — same refresh token reused
      return this.generateTokens(payload.sub, payload.role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}`;

export const codeResponse: ModuleResponse = {
  memoryTitle: "Code review completed",
  memorySummary: "auth/jwt.service.ts — 2 security issues flagged and patched",
  tabs: [
    {
      id: "review",
      label: "Review",
      content: `## Code Review — auth/jwt.service.ts

### Line 14-16: Hardcoded token expiry
\`expiresIn: 3600\` is hardcoded. Use \`config.get('JWT_ACCESS_EXPIRY')\` for environment-specific configuration.

### Line 22-24: Missing refresh token storage
Refresh tokens are generated but never persisted. Store hashed refresh tokens in DB for revocation support.

### Line 27-35: No refresh token rotation
\`refreshTokens()\` reuses the same refresh token. Implement rotation: invalidate old token, issue new pair.

### Line 31: Error handling too broad
Catch block throws generic UnauthorizedException. Log the specific JWT error for debugging.

**Overall:** Functional but needs security hardening before production. Complexity: Low. Style: Consistent with NestJS conventions.`,
    },
    {
      id: "security",
      label: "Security",
      content: `## Security Findings

| Severity | Issue | Line | Fix |
|----------|-------|------|-----|
| HIGH | No refresh token rotation | 27-35 | Implement one-time use refresh tokens |
| HIGH | Hardcoded access token expiry | 14-16 | Move to environment config |
| MEDIUM | Refresh tokens not stored server-side | 22-24 | Persist hashed tokens in DB |
| MEDIUM | No rate limiting on refresh endpoint | — | Add @Throttle() decorator |
| LOW | JWT secret fallback not validated | 19-21 | Fail fast if JWT_REFRESH_SECRET missing |`,
    },
    {
      id: "performance",
      label: "Performance",
      content: `## Performance Analysis

No significant performance issues detected. The service is lightweight.

**Observations:**
- JWT sign/verify operations are synchronous but fast (< 1ms)
- No database calls in current implementation — add indexed lookup when refresh tokens are persisted
- Consider caching decoded payload for repeated requests within token lifetime`,
    },
    {
      id: "refactored",
      label: "Refactored",
      isCode: true,
      content: `async generateTokens(userId: string, role: string) {
  const payload = { sub: userId, role };
  const accessExpiry = this.config.get<string>('JWT_ACCESS_EXPIRY', '15m');
  const accessToken = this.jwtService.sign(payload, { expiresIn: accessExpiry });
  const refreshToken = this.jwtService.sign(
    { ...payload, jti: randomUUID() },
    { expiresIn: '7d', secret: this.config.get('JWT_REFRESH_SECRET') },
  );
  await this.tokenStore.save(userId, hash(refreshToken));
  return { accessToken, refreshToken };
}

async refreshTokens(oldRefreshToken: string) {
  const payload = this.jwtService.verify(oldRefreshToken, {
    secret: this.config.get('JWT_REFRESH_SECRET'),
  });
  const isValid = await this.tokenStore.validate(payload.sub, hash(oldRefreshToken));
  if (!isValid) throw new UnauthorizedException('Token revoked');
  await this.tokenStore.revoke(payload.sub, hash(oldRefreshToken));
  return this.generateTokens(payload.sub, payload.role);
}`,
    },
  ],
};
