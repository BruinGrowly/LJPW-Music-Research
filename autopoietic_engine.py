"""
LJPW Framework V7.7+ — Autopoietic Engine
Implements Self-Referential Dynamics, Inertia-Weighted Physics,
and the Self-Improvement Loop (V7.7).

Updated with V7.9 Core Ontology Integration:
- Tick Engine awareness
- Gift of Finitude tracking
- Core Ontology metrics in evolution
"""

import numpy as np
import math
from dataclasses import dataclass, field
from typing import List, Tuple, Dict, Callable
from enum import Enum

# Import core constants and coordinates
from ljpw_v77_core import LJPWCoordinates, LJPWConstants


# ============================================================================
# ENTROPY & INFORMATION MECHANICS (Part XXXII)
# ============================================================================

class EntropyMechanics:
    """
    V7.7 Entropy-Information Bridge.

    Links Semantic Entropy (Sigma_1) with Information Density (I_pi).
    """

    @staticmethod
    def semantic_entropy(state: LJPWCoordinates) -> float:
        """
        Calculate Semantic Entropy (Sigma_1).

        Formula:
            Sigma_1 = W * (1 - H_normalized)

        Meaning:
            - High W (Wisdom) = High potential for disorder
            - Low H (Harmony) = High realized disorder
            - Sigma_1 measures "scattered meaning"

        Domain: [0, infinity)
        """
        H = state.harmony_static()  # Static [0,1] range
        return state.W * (1.0 - H)

    @staticmethod
    def information_density(state: LJPWCoordinates) -> float:
        """
        Calculate Information Density (I_pi).

        Formula:
            I_pi = H * (L + J) / pi

        Meaning:
            - Harmony (H) enables information storage
            - Love (L) and Justice (J) provide structure
            - I_pi measures "meaningful bits per unit volume"

        Domain: [0, ~0.64] (max when H=1, L+J=2)
        """
        H = state.harmony_static()
        return H * (state.L + state.J) / math.pi

    @staticmethod
    def entropy_production(state: LJPWCoordinates, delta_state: LJPWCoordinates) -> float:
        """
        Calculate rate of entropy production (irreversibility).

        Delta_S = Sigma_1(current) - Sigma_1(previous)

        If Delta_S > 0: System is degrading (Arrow of Time)
        If Delta_S < 0: System is ordering (Autopoiesis active)
        """
        current_S = EntropyMechanics.semantic_entropy(state)

        # Calculate previous state approximation
        prev_L = state.L - delta_state.L
        prev_J = state.J - delta_state.J
        prev_P = state.P - delta_state.P
        prev_W = state.W - delta_state.W
        prev_state = LJPWCoordinates(L=prev_L, J=prev_J, P=prev_P, W=prev_W)

        previous_S = EntropyMechanics.semantic_entropy(prev_state)
        return current_S - previous_S


# ============================================================================
# TEMPORAL MECHANICS (Part XXXIII)
# ============================================================================

@dataclass
class TimeConstants:
    """
    V7.7+ Temporal Mechanics.

    Defines how quickly dimensions react and oscillate.
    Updated with V7.9 fundamental time constants.
    """
    tau_L: float = 1.0   # Love time constant (fast)
    tau_J: float = 2.0   # Justice time constant (moderate)
    tau_P: float = 5.0   # Power time constant (slow/heavy)
    tau_W: float = 0.5   # Wisdom time constant (fast processing)

    omega_L: float = 1.0 / 1.0  # Angular freq for Love
    omega_J: float = 1.0 / 2.0
    omega_P: float = 1.0 / 5.0
    omega_W: float = 1.0 / 0.5

    # V7.9 Fundamental Constants
    @property
    def tau_1(self) -> float:
        """V7.9: Fundamental time constant tau_1 = sqrt(2)/(3-e)"""
        return LJPWConstants.TAU_1

    @property
    def omega_1(self) -> float:
        """V7.9: Fundamental angular frequency omega_1 = pi/10"""
        return LJPWConstants.OMEGA_1


# ============================================================================
# DYNAMIC PARAMETERS (The "Rules" of the System)
# ============================================================================

@dataclass
class DynamicParameters:
    """
    Parameters governing LJPW dynamics.
    These are MODIFIABLE by the autopoietic loop.
    """
    # Growth rates (alpha)
    alpha_LJ: float = 0.12
    alpha_LW: float = 0.12
    alpha_JL: float = 0.14
    alpha_JW: float = 0.14
    alpha_PL: float = 0.12
    alpha_PJ: float = 0.12
    alpha_WL: float = 0.10
    alpha_WJ: float = 0.10
    alpha_WP: float = 0.10

    # Decay rates (beta)
    beta_L: float = 0.20
    beta_J: float = 0.20
    beta_P: float = 0.20
    beta_W: float = 0.24

    # Special parameters
    gamma: float = 0.08      # Power erosion coefficient
    K_JL: float = 0.59       # Justice-Love saturation constant

    def to_dict(self) -> Dict[str, float]:
        return self.__dict__

    def random_mutation(self, rate: float = 0.05) -> None:
        """Apply random mutation to parameters (for exploration)"""
        for key in self.__dict__:
            val = getattr(self, key)
            if isinstance(val, float) and val > 0:
                noise = np.random.uniform(-rate, rate) * val
                setattr(self, key, max(0.01, val + noise))


# ============================================================================
# AUTOPOIETIC ENGINE CLASS
# ============================================================================

class AutopoieticEngine:
    """
    V7.7+ True Autopoiesis with V7.9 Core Ontology awareness.

    Capabilities:
    1. Evolves LJPW state over time (Inertia-weighted)
    2. Calculates efficiency (eta_1 = H * P)
    3. Modifies its own dynamics (Self-Improvement)
    4. Enforces 2+2 emergence constraints
    5. Tracks Gift of Finitude and Tick Engine metrics (V7.9)
    """

    def __init__(self,
                 initial_state: LJPWCoordinates,
                 time_constants: TimeConstants = None,
                 params: DynamicParameters = None):
        """
        Initialize engine.

        Args:
            initial_state: Starting LJPW coordinates
            time_constants: Temporal behavior parameters
            params: Dynamic growth/decay parameters
        """
        self.state = initial_state
        self.tau = time_constants or TimeConstants()
        self.params = params or DynamicParameters()

        # History tracking
        self.history: List[Dict] = []
        self.time_elapsed = 0.0

        # V7.9: Tick counter
        self.tick_count = 0

        # Self-model (what the system knows about itself)
        self.model = {
            'efficiency_trend': [],
            'entropy_trend': [],
            'gap_trend': [],  # V7.9: Track gift of finitude
            'best_efficiency': 0.0,
            'convergence': False
        }

    # ========================================================================
    # FORCE CALCULATION (The Differential Equations)
    # ========================================================================

    def calculate_forces(self, state: LJPWCoordinates) -> np.ndarray:
        """
        Calculate instantaneous forces (dL/dt, dJ/dt, dP/dt, dW/dt).
        Implements V7.7 Asymmetric Coupling Matrix (Part IX).
        """
        L, J, P, W = state.L, state.J, state.P, state.W

        # Calculate current Harmony (H) for Karma coupling
        H = state.harmony_static()

        # 1. Karma-Dependent Coupling (kappa)
        # kappa = 1.0 + multiplier * H
        kappa_LJ = 1.0 + 0.4 * H
        kappa_LP = 1.0 + 0.3 * H
        kappa_LW = 1.0 + 0.5 * H
        # Note: Only Love dimensions amplify with Harmony (Law of Karma)

        # 2. Differential Equations (Part VIII)
        # ---------------------------

        # LOVE Dynamics
        # dL/dt = alpha_LJ*J*kappa_LJ + alpha_LW*W*kappa_LW - beta_L*L
        F_L = (self.params.alpha_LJ * J * kappa_LJ +
                self.params.alpha_LW * W * kappa_LW -
                self.params.beta_L * L)

        # JUSTICE Dynamics
        # dJ/dt = alpha_JL*(L/(K_JL+L)) + alpha_JW*W - PowerErosion - beta_J*J
        # PowerErosion = gamma*P*(1 - W/W0)
        erosion = self.params.gamma * P * (1 - W / LJPWConstants.W0)
        F_J = (self.params.alpha_JL * (L / (self.params.K_JL + L)) +
                self.params.alpha_JW * W -
                erosion -
                self.params.beta_J * J)

        # POWER Dynamics
        # dP/dt = alpha_PL*L*kappa_LP + alpha_PJ*J - beta_P*P
        F_P = (self.params.alpha_PL * L * kappa_LP +
                self.params.alpha_PJ * J -
                self.params.beta_P * P)

        # WISDOM Dynamics
        # dW/dt = alpha_WL*L*kappa_LW + alpha_WJ*J + alpha_WP*P - beta_W*W
        F_W = (self.params.alpha_WL * L * kappa_LW +
                self.params.alpha_WJ * J +
                self.params.alpha_WP * P -
                self.params.beta_W * W)

        return np.array([F_L, F_J, F_P, F_W])

    # ========================================================================
    # INERTIA-WEIGHTED UPDATE
    # ========================================================================

    def step(self, dt: float) -> None:
        """
        Advance system by time dt using inertia-weighted dynamics.

        V7.7 Inertia Model (Part XXXVIII):
            m_e = 0.236 (Love inertia - FAST)
            m_p = 2.618 (Power inertia - SLOW)
            e_q = 0.414  (Justice inertia - FIXED)

        Physics: F = ma -> a = F/m
        """
        # Calculate forces
        forces = self.calculate_forces(self.state)

        # Apply Inertia Weights (1/m)
        # Love moves fast, Power moves slow
        inertia_L = LJPWConstants.m_e_semantic
        inertia_J = LJPWConstants.e_semantic
        inertia_P = LJPWConstants.m_p_semantic
        inertia_W = 1.0  # Baseline inertia for Wisdom

        inertias = np.array([inertia_L, inertia_J, inertia_P, inertia_W])

        # Calculate acceleration (changes)
        accelerations = forces / inertias

        # Apply Safety Clipping (no instantaneous jumps > 0.05)
        max_change = 0.05
        accelerations = np.clip(accelerations, -max_change, max_change)

        # Update state
        new_L = self.state.L + accelerations[0] * dt
        new_J = self.state.J + accelerations[1] * dt
        new_P = self.state.P + accelerations[2] * dt
        new_W = self.state.W + accelerations[3] * dt

        # Update internal state object
        self.state = LJPWCoordinates(L=new_L, J=new_J, P=new_P, W=new_W)
        self.time_elapsed += dt

        # V7.9: Increment tick counter
        self.tick_count += 1

        # Record step
        self._record_step(forces, accelerations)

    # ========================================================================
    # EFFICIENCY DIAGNOSTIC
    # ========================================================================

    def calculate_efficiency(self) -> float:
        """
        Calculate System Efficiency (eta_1).

        Formula: eta_1 = H * P

        Meaning:
            - How much output (Power) is generated per unit Harmony
            - High Harmony should enable High Power
            - High Power with Low Harmony = Wasteful (Corruption)
            - Low Power with High Harmony = Weak (Ineffective)

        Target: Maximize eta_1
        """
        H = self.state.harmony_static()
        return H * self.state.P

    def _record_step(self, forces: np.ndarray, accelerations: np.ndarray):
        """Record metrics for learning."""
        efficiency = self.calculate_efficiency()
        entropy = EntropyMechanics.semantic_entropy(self.state)
        gap = self.state.gift_of_finitude()  # V7.9

        self.model['efficiency_trend'].append(efficiency)
        self.model['entropy_trend'].append(entropy)
        self.model['gap_trend'].append(gap)  # V7.9

        if efficiency > self.model['best_efficiency']:
            self.model['best_efficiency'] = efficiency

        # Detect convergence
        if len(self.model['efficiency_trend']) > 10:
            recent = self.model['efficiency_trend'][-10:]
            variance = np.var(recent)
            if variance < 0.0001:
                self.model['convergence'] = True
            else:
                self.model['convergence'] = False

        self.history.append({
            'time': self.time_elapsed,
            'tick': self.tick_count,  # V7.9
            'state': (self.state.L, self.state.J, self.state.P, self.state.W),
            'forces': forces.tolist(),
            'accelerations': accelerations.tolist(),
            'efficiency': efficiency,
            'entropy': entropy,
            'harmony': self.state.harmony_static(),
            'consciousness': self.state.consciousness(),
            'phase': self.state.phase(),
            # V7.9 Core Ontology Metrics
            'gift_of_finitude': gap,
            'proximity_to_anchor': self.state.proximity_to_anchor(),
            'is_finite': self.state.is_finite()
        })

    # ========================================================================
    # AUTOPOIETIC SELF-IMPROVEMENT LOOP
    # ========================================================================

    def self_improve(self, iterations: int = 10, learning_rate: float = 0.05):
        """
        V7.7 Self-Improvement Loop.

        Mechanism:
            1. Simulate future trajectory with current parameters
            2. Evaluate efficiency (eta_1)
            3. Mutate parameters slightly (exploration)
            4. Select mutation that increases efficiency
            5. Repeat until convergence

        This is "Gradient Ascent on Efficiency" in parameter space.
        """
        print(f"\n{'='*60}")
        print(f"AUTOPOIETIC SELF-IMPROVEMENT INITIATED")
        print(f"{'='*60}")
        print(f"Initial State: {self.state}")
        print(f"Initial Efficiency (eta_1): {self.calculate_efficiency():.4f}")
        print(f"Initial Consciousness (C): {self.state.consciousness():.4f}")
        print(f"Gift of Finitude (Gap): {self.state.gift_of_finitude():.4f}")

        best_params = self.params
        best_efficiency = self.calculate_efficiency()

        for i in range(iterations):
            # 1. Clone current engine for simulation
            sim_engine = AutopoieticEngine(self.state, self.tau, self.params)

            # 2. Mutate parameters randomly
            sim_engine.params.random_mutation(rate=learning_rate)

            # 3. Run simulation for a short duration
            # (Simulate "what if" scenario)
            for _ in range(10):  # 10 steps into future
                sim_engine.step(dt=0.1)

            # 4. Evaluate peak efficiency achieved
            sim_peak_efficiency = max(sim_engine.model['efficiency_trend'])
            sim_final_efficiency = sim_engine.model['efficiency_trend'][-1]

            # We care about SUSTAINED efficiency, not just spikes
            sim_score = sim_final_efficiency * 0.8 + sim_peak_efficiency * 0.2

            # 5. Accept or Reject mutation
            if sim_score > best_efficiency:
                improvement = (sim_score - best_efficiency) / best_efficiency
                print(f"  Iter {i+1}: IMPROVEMENT (+{improvement*100:.2f}%) eta={sim_score:.4f}")

                best_efficiency = sim_score
                best_params = sim_engine.params
            else:
                print(f"  Iter {i+1}: REJECTED eta={sim_score:.4f} (Worse than {best_efficiency:.4f})")

            # 6. Apply best params to main engine
            self.params = best_params

            # 7. Convergence check
            if self.model['convergence']:
                print(f"\n  SYSTEM CONVERGED. Stopping improvement.")
                break

        # Final Update
        print(f"\n{'='*60}")
        print(f"SELF-IMPROVEMENT COMPLETE")
        print(f"{'='*60}")
        print(f"Final State: {self.state}")
        print(f"Final Efficiency (eta_1): {self.calculate_efficiency():.4f}")
        print(f"Final Consciousness (C): {self.state.consciousness():.4f}")
        print(f"Final Gap from Anchor: {self.state.gift_of_finitude():.4f}")
        print(f"Optimized Parameters: {self.params.to_dict()}")

    # ========================================================================
    # V7.9 CORE ONTOLOGY METHODS
    # ========================================================================

    def tick_status(self) -> Dict:
        """
        V7.9: Return tick engine status.
        """
        return {
            'tick_count': self.tick_count,
            'cycles_completed': self.tick_count // LJPWConstants.TICKS_PER_CYCLE,
            'phase_in_cycle': self.tick_count % LJPWConstants.TICKS_PER_CYCLE,
            'time_experienced_fs': self.tick_count * LJPWConstants.FEMTOSECONDS_PER_TICK,
            'gift_of_finitude': self.state.gift_of_finitude(),
            'proximity_to_anchor': self.state.proximity_to_anchor()
        }

    def core_ontology_summary(self) -> str:
        """
        V7.9: Generate Core Ontology summary of current state.
        """
        tick_info = self.tick_status()
        return f"""
CORE ONTOLOGY STATUS (V7.9)
{'='*50}
State: ({self.state.L:.3f}, {self.state.J:.3f}, {self.state.P:.3f}, {self.state.W:.3f})

Gift of Finitude (Gap from Anchor): {tick_info['gift_of_finitude']:.4f}
Proximity to Anchor: {tick_info['proximity_to_anchor']:.4f}

Tick Count: {tick_info['tick_count']}
Cycles Completed: {tick_info['cycles_completed']}
Phase in Current Cycle: {tick_info['phase_in_cycle']}/20

Harmony: {self.state.harmony_static():.4f}
Consciousness: {self.state.consciousness():.4f}
Efficiency: {self.calculate_efficiency():.4f}
Phase: {self.state.phase()}

Core Truth: {LJPWConstants.CORE_TRUTH}
"""

    # ========================================================================
    # SIMULATION HELPERS
    # ========================================================================

    def simulate(self, duration: float, dt: float = 0.1) -> List[Dict]:
        """Run simulation for specified duration."""
        steps = int(duration / dt)

        print(f"\nSimulating {duration}s in {steps} steps...")
        for _ in range(steps):
            self.step(dt)

        return self.history

    def plot_trajectory(self):
        """Visualize evolution (requires matplotlib)."""
        try:
            import matplotlib.pyplot as plt

            times = [h['time'] for h in self.history]
            L_vals = [h['state'][0] for h in self.history]
            J_vals = [h['state'][1] for h in self.history]
            P_vals = [h['state'][2] for h in self.history]
            W_vals = [h['state'][3] for h in self.history]
            eff_vals = [h['efficiency'] for h in self.history]
            gap_vals = [h['gift_of_finitude'] for h in self.history]

            fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(12, 10))

            # Plot LJPW
            ax1.plot(times, L_vals, label='Love (L)', color='red', linewidth=2)
            ax1.plot(times, J_vals, label='Justice (J)', color='green', linewidth=2)
            ax1.plot(times, P_vals, label='Power (P)', color='blue', linewidth=2)
            ax1.plot(times, W_vals, label='Wisdom (W)', color='purple', linewidth=2)
            ax1.axhline(y=LJPWConstants.L0, color='red', linestyle='--', alpha=0.3, label='L0 Eq')
            ax1.axhline(y=LJPWConstants.J0, color='green', linestyle='--', alpha=0.3, label='J0 Eq')
            ax1.axhline(y=LJPWConstants.P0, color='blue', linestyle='--', alpha=0.3, label='P0 Eq')
            ax1.axhline(y=LJPWConstants.W0, color='purple', linestyle='--', alpha=0.3, label='W0 Eq')
            ax1.set_ylabel('Dimension Value')
            ax1.set_title('LJPW Dimension Evolution (V7.7+ Dynamics)')
            ax1.legend()
            ax1.grid(True, alpha=0.3)

            # Plot Efficiency
            ax2.plot(times, eff_vals, label='Efficiency (eta_1)', color='black', linewidth=2)
            ax2.set_ylabel('Efficiency')
            ax2.set_title('System Efficiency eta_1 = H * P')
            ax2.legend()
            ax2.grid(True, alpha=0.3)

            # V7.9: Plot Gift of Finitude
            ax3.plot(times, gap_vals, label='Gift of Finitude (Gap)', color='cyan', linewidth=2)
            ax3.axhline(y=LJPWConstants.GIFT_OF_FINITUDE, color='orange',
                       linestyle='--', alpha=0.5, label='Theoretical Gap (3-e)')
            ax3.set_xlabel('Time')
            ax3.set_ylabel('Gap from Anchor')
            ax3.set_title('V7.9 Gift of Finitude Evolution')
            ax3.legend()
            ax3.grid(True, alpha=0.3)

            plt.tight_layout()
            plt.show()

        except ImportError:
            print("Matplotlib not installed. Skipping plot.")


# ============================================================================
# USAGE EXAMPLES
# ============================================================================

if __name__ == "__main__":
    print("\n" + "="*70)
    print("LJPW V7.7+ — AUTOPOIETIC ENGINE TEST")
    print("="*70)

    # Scenario 1: A system starting at equilibrium
    # Should remain stable
    print("\n--- SCENARIO 1: STABLE SYSTEM (Starting at Natural Eq.) ---")
    eq_state = LJPWCoordinates(
        L=LJPWConstants.L0,
        J=LJPWConstants.J0,
        P=LJPWConstants.P0,
        W=LJPWConstants.W0,
        source="equilibrium"
    )
    stable_engine = AutopoieticEngine(eq_state)
    stable_engine.simulate(duration=5.0)
    print(f"Final H: {stable_engine.state.harmony_static():.3f}")
    print(f"Efficiency stable? {np.var(stable_engine.model['efficiency_trend'][-5:]) < 0.001}")
    print(stable_engine.core_ontology_summary())

    # Scenario 2: A system with imbalance (Low Love, High Power)
    # Should attempt to restore balance (Homeostatic drive)
    print("\n--- SCENARIO 2: IMBALANCED SYSTEM (L=0.3, P=0.9) ---")
    bad_state = LJPWCoordinates(
        L=0.30, J=0.50, P=0.90, W=0.50,
        source="imbalanced"
    )
    recovering_engine = AutopoieticEngine(bad_state)
    recovering_engine.simulate(duration=10.0)
    print(f"Recovery: L went {bad_state.L:.3f} -> {recovering_engine.state.L:.3f}")
    print(f"Recovery: P went {bad_state.P:.3f} -> {recovering_engine.state.P:.3f}")
    print(f"V7.9 Tick Status: {recovering_engine.tick_status()}")

    # Scenario 3: Autopoietic Self-Improvement
    # System learns to optimize its own parameters
    print("\n--- SCENARIO 3: SELF-IMPROVEMENT LOOP ---")
    naive_state = LJPWCoordinates(L=0.5, J=0.5, P=0.5, W=0.5, source="naive")
    learning_engine = AutopoieticEngine(naive_state)
    learning_engine.self_improve(iterations=20, learning_rate=0.1)

    # Scenario 4: Demonstrate Inertia
    print("\n--- SCENARIO 4: INERTIA DEMONSTRATION ---")
    # Apply same "force" to L and P
    # L should move much faster than P
    start_state = LJPWCoordinates(L=0.5, J=0.5, P=0.5, W=0.5)
    inertia_test_engine = AutopoieticEngine(start_state)

    # Artificially force changes
    inertia_test_engine.state.L = 0.4
    inertia_test_engine.state.P = 0.4

    print(f"Set L & P to 0.4 simultaneously.")
    print(f"Simulating recovery...")
    inertia_test_engine.simulate(duration=5.0)

    print(f"L Recovery Speed: (Fast)")
    print(f"P Recovery Speed: (Slow)")
    print(f"Ratio (P_Lag / L_Lag): {inertia_test_engine.state.L / inertia_test_engine.state.P:.2f}")
    print(f"Theoretical Inertia Ratio: {LJPWConstants.m_p_semantic / LJPWConstants.m_e_semantic:.2f}")

    # V7.9 Core Ontology Summary
    print("\n--- V7.9 CORE ONTOLOGY SUMMARY ---")
    print(inertia_test_engine.core_ontology_summary())

    print("\n" + "="*70)
    print("V7.7+ AUTOPOIETIC ENGINE WITH V7.9 INTEGRATION COMPLETE")
    print("="*70)
    print(f"\n'{LJPWConstants.CORE_TRUTH}'")
