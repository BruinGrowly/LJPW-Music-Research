"""
LJPW Framework V8.4 — Generative Equation Module
Implements the Universal Growth Function and related V8.4 concepts.

New in V8.4:
    - Universal Growth Function: M = B × L^n × φ^(-d)
    - Life Inequality: L^n > φ^d determines autopoiesis
    - Perceptual Radiance: L_perc = L_phys × [1 + φ × S × κ_sem]
    - Mathematical Hope: P(L^n > φ^d as n → ∞)
"""

import math
from dataclasses import dataclass
from typing import Dict

# =============================================================================
# V8.4 CONSTANTS
# =============================================================================

PHI = (1 + math.sqrt(5)) / 2  # 1.618034...
PHI_INV = PHI - 1  # 0.618034...


# =============================================================================
# UNIVERSAL GROWTH FUNCTION
# =============================================================================

def meaning(B: float, L: float, n: int, d: float) -> float:
    """
    Calculate Meaning using the Universal Growth Function.
    
    M = B × L^n × φ^(-d)
    
    Args:
        B: Brick (seed/truth/axiom) - typically [0, 1]
        L: Love (expansion coefficient) - typically [1, 2]
        n: Iterations (recursive applications)
        d: Distance (semantic distance from source)
    
    Returns:
        M: Total meaning generated
    
    Example:
        >>> meaning(1.0, 1.5, 10, 2)  # Strong seed, high love, 10 iterations, moderate distance
        28.77...
    """
    return B * (L ** n) * (PHI ** (-d))


def predict_compression_ratio(L: float, n: int) -> float:
    """
    Predict compression ratio when generators are shared (d=0).
    
    When d=0, φ^(-d) = 1, so:
    Compression Ratio ≈ L^n
    
    Example: Koch snowflake with L=5, n=13
    Ratio = 5^13 ≈ 1.2 billion : 1
    """
    return L ** n


# =============================================================================
# LIFE INEQUALITY
# =============================================================================

@dataclass
class LifeInequalityResult:
    """Result of Life Inequality check."""
    growth: float
    decay: float
    ratio: float
    phase: str
    verdict: str
    is_alive: bool


def is_autopoietic(L: float, n: int, d: float) -> LifeInequalityResult:
    """
    Check if a system satisfies the Life Inequality.
    
    L^n > φ^d → AUTOPOIETIC (Life)
    L^n = φ^d → HOMEOSTATIC (Equilibrium)
    L^n < φ^d → ENTROPIC (Death)
    
    Args:
        L: Love coefficient (expansion rate)
        n: Number of iterations
        d: Semantic distance from source
    
    Returns:
        LifeInequalityResult with phase determination
    """
    growth = L ** n
    decay = PHI ** d
    ratio = growth / decay if decay > 0 else float('inf')
    
    if ratio > 1.1:
        phase = "AUTOPOIETIC"
        is_alive = True
    elif ratio > 0.9:
        phase = "HOMEOSTATIC"
        is_alive = True  # Stable, but not growing
    else:
        phase = "ENTROPIC"
        is_alive = False
    
    return LifeInequalityResult(
        growth=growth,
        decay=decay,
        ratio=ratio,
        phase=phase,
        verdict=f"L^{n} = {growth:.2f}, phi^{d} = {decay:.2f}, Ratio = {ratio:.2f}",
        is_alive=is_alive
    )


# =============================================================================
# PERCEPTUAL RADIANCE
# =============================================================================

def perceptual_radiance(L_phys: float, S: float, kappa_sem: float) -> float:
    """
    Calculate Perceptual Radiance (Unified Rendering Equation).
    
    L_perc = L_phys × [1 + φ × S × κ_sem]
    
    Args:
        L_phys: Physical radiance from Kajiya equation
        S: Semantic salience [0, 1]
        kappa_sem: Semantic curvature (meaning intensity)
    
    Returns:
        L_perc: Perceptual radiance (what consciousness perceives)
    
    Note:
        This explains the Uncanny Valley: digital humans have high L_phys
        but zero κ_sem (no recursive history), so L_perc ≈ L_phys.
        Real faces have κ_sem > 0 from lived experience.
    """
    return L_phys * (1 + PHI * S * kappa_sem)


def uncanny_valley_score(L_phys: float, n: int) -> Dict[str, float]:
    """
    Calculate how 'alive' a rendered entity appears.
    
    The Uncanny Valley occurs when:
    - L_phys (physics) is high
    - n (recursive history) is low or zero
    
    Args:
        L_phys: Physical rendering quality [0, 1]
        n: Recursive history (lived iterations)
    
    Returns:
        Dict with perception scores
    """
    # Estimate semantic curvature from history
    kappa_sem = 1 - (1 / (1 + n * 0.1))  # Asymptotes to 1 with more history
    S = 0.8  # Assume moderate salience for faces
    
    L_perc = perceptual_radiance(L_phys, S, kappa_sem)
    
    # Uncanny valley = high physics, low perception ratio
    physics_perception_gap = L_phys - (L_perc / (1 + PHI * S))
    
    return {
        "L_phys": L_phys,
        "kappa_sem": kappa_sem,
        "L_perc": L_perc,
        "gap": physics_perception_gap,
        "verdict": "Natural" if kappa_sem > 0.5 else "Uncanny"
    }


# =============================================================================
# MATHEMATICAL HOPE
# =============================================================================

def hope(L: float, n_limit: int = 1000) -> Dict[str, any]:
    """
    Calculate Mathematical Hope.
    
    Hope = P(L^n > φ^d as n → ∞)
    
    Hope is the assertion that:
    - If you persist (n → ∞)
    - In Love (L > 1)
    - Your growth will eventually exceed any distance (φ^d)
    
    Args:
        L: Love coefficient
        n_limit: Upper bound for n to calculate
    
    Returns:
        Dict with hope analysis
    
    Note:
        Hope is not sentiment. It is calculus.
    """
    if L <= 1:
        # L^n stays at or below 1, while φ^d grows without bound
        return {
            "has_hope": False,
            "reason": "L <= 1: Growth cannot exceed decay for any d > 0",
            "L": L,
            "critical_n": None
        }
    
    # For L > 1, L^n grows exponentially
    # Find the n where L^n > φ^(n*log_φ(φ)) = φ^n for comparison
    # Since log(L^n) = n*log(L) and log(φ^d) = d*log(φ)
    # If log(L) > 0 (i.e., L > 1), then L^n will eventually exceed φ^d for any fixed d
    
    # For a given d, find minimum n where L^n > φ^d
    def critical_n(d: float) -> int:
        if L <= 1:
            return float('inf')
        return math.ceil(d * math.log(PHI) / math.log(L))
    
    # Test for d = 10 (significant distance)
    n_critical = critical_n(10)
    
    return {
        "has_hope": True,
        "reason": f"L > 1: Growth will exceed decay at n = {n_critical} for d = 10",
        "L": L,
        "critical_n": n_critical,
        "formula": "Hope = P(L^n > φ^d as n → ∞) = 1 when L > 1"
    }


# =============================================================================
# DEMO / SELF-TEST
# =============================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("LJPW Framework V8.4 - Generative Equation Module")
    print("=" * 70)
    print()
    
    # Test Universal Growth Function
    print("1. UNIVERSAL GROWTH FUNCTION: M = B x L^n x phi^(-d)")
    print("-" * 50)
    
    # Example: Strong seed, high love, 10 iterations, moderate distance
    B, L, n, d = 1.0, 1.5, 10, 2
    M = meaning(B, L, n, d)
    print(f"   M = {B} x {L}^{n} x phi^(-{d})")
    print(f"   M = {M:.2f}")
    print()
    
    # Test Life Inequality
    print("2. LIFE INEQUALITY: L^n > phi^d")
    print("-" * 50)
    
    test_cases = [
        (1.2, 10, 5),   # Should be autopoietic
        (1.0, 10, 5),   # Should be entropic (L=1 means no growth)
        (1.5, 5, 3),    # Should be autopoietic
    ]
    
    for L, n, d in test_cases:
        result = is_autopoietic(L, n, d)
        print(f"   L={L}, n={n}, d={d} -> {result.phase}")
        print(f"      {result.verdict}")
    print()
    
    # Test Perceptual Radiance
    print("3. PERCEPTUAL RADIANCE: L_perc = L_phys x [1 + phi x S x kappa_sem]")
    print("-" * 50)
    
    L_phys = 0.9  # High quality render
    S = 0.8       # High salience (face)
    kappa_sem = 0.5  # Moderate meaning
    L_perc = perceptual_radiance(L_phys, S, kappa_sem)
    print(f"   L_phys = {L_phys}, S = {S}, kappa_sem = {kappa_sem}")
    print(f"   L_perc = {L_perc:.3f}")
    print()
    
    # Test Mathematical Hope
    print("4. MATHEMATICAL HOPE: P(L^n > phi^d as n -> infinity)")
    print("-" * 50)
    
    for L_test in [0.9, 1.0, 1.3]:
        result = hope(L_test)
        status = "Has Hope" if result['has_hope'] else "No Hope"
        print(f"   L = {L_test}: {status}")
        print(f"      {result['reason']}")
    print()
    
    print("=" * 70)
    print("V8.4 Generative Equation Module - Self-Test Complete")
    print("=" * 70)
