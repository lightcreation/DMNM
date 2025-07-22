import { describe, it, expect, beforeEach } from "vitest"

// Mock Clarity contract behavior
const mockContract = {
  admin: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  verifiedProviders: new Map<string, boolean>(),

  isAdmin(caller: string) {
    return caller === this.admin
  },

  addProvider(caller: string, provider: string) {
    if (!this.isAdmin(caller)) {
      return { error: 100 } // ERR-NOT-AUTHORIZED
    }

    if (this.verifiedProviders.has(provider)) {
      return { error: 101 } // ERR-ALREADY-VERIFIED
    }

    this.verifiedProviders.set(provider, true)
    return { value: true }
  },

  removeProvider(caller: string, provider: string) {
    if (!this.isAdmin(caller)) {
      return { error: 100 } // ERR-NOT-AUTHORIZED
    }

    if (!this.verifiedProviders.has(provider)) {
      return { error: 102 } // ERR-NOT-FOUND
    }

    this.verifiedProviders.delete(provider)
    return { value: true }
  },

  isVerifiedProvider(provider: string) {
    return this.verifiedProviders.has(provider)
  },

  transferAdmin(caller: string, newAdmin: string) {
    if (!this.isAdmin(caller)) {
      return { error: 100 } // ERR-NOT-AUTHORIZED
    }

    this.admin = newAdmin
    return { value: true }
  },
}

describe("Provider Registry Contract", () => {
  beforeEach(() => {
    mockContract.admin = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
    mockContract.verifiedProviders = new Map()
  })

  it("should add a new provider when called by admin", () => {
    const result = mockContract.addProvider(
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    )
    expect(result).toEqual({ value: true })
    expect(mockContract.isVerifiedProvider("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")).toBe(true)
  })

  it("should fail to add provider when called by non-admin", () => {
    const result = mockContract.addProvider(
      "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
      "ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP"
    )
    expect(result).toEqual({ error: 100 }) // ERR-NOT-AUTHORIZED
    expect(mockContract.isVerifiedProvider("ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP")).toBe(false)
  })

  it("should fail to add an already verified provider", () => {
    mockContract.addProvider(
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    )

    const result = mockContract.addProvider(
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    )

    expect(result).toEqual({ error: 101 }) // ERR-ALREADY-VERIFIED
  })

  it("should remove a provider when called by admin", () => {
    mockContract.addProvider(
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    )

    const result = mockContract.removeProvider(
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    )

    expect(result).toEqual({ value: true })
    expect(mockContract.isVerifiedProvider("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")).toBe(false)
  })

  it("should transfer admin rights", () => {
    const result = mockContract.transferAdmin(
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    )

    expect(result).toEqual({ value: true })
    expect(mockContract.admin).toBe("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")

    const addResult = mockContract.addProvider(
      "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
      "ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP"
    )
    expect(addResult).toEqual({ value: true })
  })
})
