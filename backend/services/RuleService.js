// Helper function to parse a rule string and build the AST
exports.createAST = (ruleString) => {
    try {
        const tokens = ruleString.match(/\(|\)|AND|OR|>|<|=|'[^']*'|\S+/g);
        if (!tokens) throw new Error("No tokens found in the rule string");
        
        let index = 0;

        function parseExpression() {
            const node = {};
            if (tokens[index] === '(') {
                index++; // Skip '('
                node.left = parseExpression();
                node.type = tokens[index++];
                node.right = parseExpression();
                index++; // Skip ')'
            } else {
                node.type = 'operand';
                node.value = tokens[index++];
            }
            return node;
        }

        return parseExpression();
    } catch (error) {
        console.error("Error parsing AST:", error);
        throw new Error("Invalid rule string format");
    }
};

// Combine multiple rules into one AST
exports.combineRules = (rules) => {
    if (rules.length === 0) return null;
    let combinedAST = rules[0];
    for (let i = 1; i < rules.length; i++) {
        combinedAST = {
            type: 'AND',
            left: combinedAST,
            right: rules[i]
        };
    }
    return combinedAST;
};

// Evaluate the AST against user data
exports.evaluateRuleRequest = async (req,res) => {
    if (ast.type === 'operand') {
        const [key, operator, value] = ast.value.split(' ');
        switch (operator) {
            case '>':
                return userData[key] > value;
            case '<':
                return userData[key] < value;
            case '=':
                return userData[key] === value;
            default:
                return false;
        }
    }

    const leftEval = exports.evaluateRuleRequest(ast.left, userData);
    const rightEval = exports.evaluateRuleRequest(ast.right, userData);

    switch (ast.type) {
        case 'AND':
            return leftEval && rightEval;
        case 'OR':
            return leftEval || rightEval;
        default:
            return false;
    }
};
