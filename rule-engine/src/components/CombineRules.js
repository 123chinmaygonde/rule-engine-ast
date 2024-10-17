import React, { useState } from 'react';

const CombineRules = () => {
    const [ruleIds, setRuleIds] = useState('');
    const [message, setMessage] = useState('');

    const combineRules = async () => {
        const idsArray = ruleIds.split(',').map(id => id.trim());
        const response = await fetch('http://localhost:3000/api/rules/combine', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ruleIds: idsArray }),
        });

        const data = await response.json();
        if (!response.ok) {
            setMessage(`Error: ${data.message}`);
        } else {
            setMessage(`Combined AST: ${JSON.stringify(data.combinedAST)}`);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Combine Rules</h2>
            <input
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                type="text"
                value={ruleIds}
                onChange={(e) => setRuleIds(e.target.value)}
                placeholder="Enter Rule IDs (comma-separated)"
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={combineRules}
            >
                Combine Rules
            </button>
            <div className="mt-4 text-green-500">{message}</div>
        </div>
    );
};

export default CombineRules;