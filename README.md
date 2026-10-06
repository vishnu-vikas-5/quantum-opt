# Maximize Returns While Minimizing Risk Using QAOA
## Quantum Approximate Optimization Algorithm for Portfolio Optimization

An interactive, academic-grade research prototype demonstrating portfolio optimization using the **Quantum Approximate Optimization Algorithm (QAOA)** and **Quadratic Unconstrained Binary Optimization (QUBO)** formulation.

---

### Project Overview

This research prototype formulates the classic Markowitz mean-variance portfolio optimization problem with cardinality constraints into a **QUBO matrix**, transforms it into an **Ising Hamiltonian**, and solves it using **QAOA parametric quantum circuits**.

The final portfolio is evaluated using the **Sharpe Ratio**:
$$S = \frac{R_p - R_f}{\sigma_p}$$

---

### Key Mathematical Formulations

1. **Portfolio Expected Return**:
   $$R_p = \mu^T w = \sum_{i=1}^N \mu_i w_i$$

2. **Portfolio Volatility (Risk)**:
   $$\sigma_p^2 = w^T \Sigma w = \sum_{i,j} w_i w_j \Sigma_{ij}$$

3. **QUBO Objective Cost Function**:
   $$C(x) = \lambda x^T \Sigma x - (1-\lambda) \mu^T x + P \left(\sum_{i=1}^N x_i - K\right)^2$$
   - $\lambda \in [0, 1]$: Risk aversion parameter
   - $K$: Target portfolio size constraint
   - $P$: Violation penalty multiplier

4. **Ising Hamiltonian Mapping**:
   $$x_i = \frac{I - Z_i}{2} \implies H_C = \sum_{i=1}^N h_i Z_i + \sum_{i < j} J_{ij} Z_i Z_j + E_0 \cdot I$$

5. **QAOA Parametric Circuit State**:
   $$|\gamma, \beta\rangle = \prod_{k=1}^p U(H_B, \beta_k) U(H_C, \gamma_k) |+\rangle^{\otimes N}$$

---

### 18 Website Sections Included

1. **Hero Overview**: Quantum circuit animation, stats, and quick actions.
2. **Problem Definition**: Mathematical objectives, glossary, and end-to-end pipeline diagram.
3. **Asset Selection**: 8 financial assets (AAPL, MSFT, NVDA, AMZN, GOOGL, META, TSLA, JPM) with return/volatility metrics & target size $K$ slider.
4. **Portfolio Parameters**: Controls for $\lambda, K, P$, and depth $p$.
5. **QUBO Formulation**: Equation breakdown cards & $8 \times 8$ QUBO heatmap matrix visualizer.
6. **Ising Model**: Pauli-Z operator mapping, linear bias vector $h_i$, and interaction matrix $J_{ij}$.
7. **QAOA Experiment**: Parameter sliders ($\gamma, \beta$), parametric circuit schematic, and step-by-step progress simulation runner.
8. **QAOA Convergence**: Line chart plotting cost function reduction over 50 COBYLA optimizer iterations.
9. **Measurement Distribution**: Quantum sampling probability histogram & computational basis bitstring decoder.
10. **Optimal Portfolio**: Selected assets checklist, allocation donut chart, return, risk, and Sharpe ratio cards.
11. **Risk–Return Landscape**: 256 candidate portfolios scatter plot with Efficient Frontier curve and hover tooltips.
12. **Sharpe Ratio Analysis**: Risk-adjusted performance breakdown & interactive Risk-Free yield calculator.
13. **Classical vs QAOA**: Direct comparison matrix comparing exact classical brute-force vs QAOA quantum simulator.
14. **Parameter Lab**: Interactive sensitivity laboratory testing $\lambda$ variations & trade-off chart.
15. **Methodology**: 9-step academic project timeline.
16. **Quantum Concepts**: Educational cards explaining Qubit, Superposition, Entanglement, Cost Hamiltonian, Mixer Hamiltonian, and QAOA.
17. **Executive Dashboard**: Final summary card with instant navigation shortcuts.
18. **Footer & Academic Disclaimer**: Capstone attribution, tech badges, and research disclaimers.

---

### Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with Dark Obsidian Glassmorphic Design Tokens
- **Math Notation**: KaTeX ($\LaTeX$)
- **Charts & Data Viz**: Chart.js + React-Chartjs-2
- **Icons**: Lucide React
- **Celebration Animations**: Canvas Confetti

---

### Getting Started Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

### Academic Disclaimer
This prototype is intended solely for academic research and capstone project demonstration purposes. Displayed financial values and results are synthetic simulation benchmarks and do not constitute investment advice.
