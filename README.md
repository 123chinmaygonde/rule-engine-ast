# rule-engine-ast
# Objective
This project implements a 3-tier rule engine to determine user eligibility based on attributes such as age, department, income, and spend. The system uses an Abstract Syntax Tree (AST) to represent conditional rules and supports dynamic creation, combination, and modification of these rules.
# Features
1) Rule Creation: Allows users to create individual rules and represent them as ASTs.
2) Rule Combination: Combines multiple rules into a single AST, ensuring efficiency and minimal redundancy.
3) Rule Evaluation: Evaluates JSON data against combined AST rules and returns a result indicating whether a user meets specific conditions.
4) Error Handling: Includes error handling for invalid rule strings and formats.
5) Bonus Features: Includes validations and modifications to existing rules.

# API-Endpoints
POST /create: Creates a rule and returns the corresponding AST.
POST /combine: Combines multiple rules into a single AST.
POST /evaluate: Evaluates provided data against the combined AST.

# Data Structure
type: Defines the node type (e.g., "operator", "operand").
left: Reference to another node (left child).
right: Reference to another node (right child).
value: Optional value for operand nodes (e.g., comparison values).

# Sample Rules
rule1 = ((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)
rule2 = ((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)

# Test Cases
Test individual rule creation and AST representation.
Test combining rules.
Evaluate different data scenarios using JSON inputs.

# Dependencies
Node.js
Express.js
MongoDB (for storing rules and application metadata)

# Setup Instructions
1) git clone https://github.com/123chinmaygonde/rule-engine-ast
2) npm install
3) cd rule-engine-ast
4) cd backend
5) npm run dev
6) cd rule-engine
7) npm start










