function getMaxDegreeOfNumber(maxValue, defaultDivider, additionalDivider) {
	var divider = 1 * additionalDivider;
	var maxDegree = 0;
	while (divider <= maxValue) {
		divider = divider * defaultDivider;
		maxDegree++;
	}
	return maxDegree - 1;
}

function getCountOfDivider(value, divider) {
	return (value - value % divider) / divider;
}

function getCountOfDividers(defaultDivider, maxValue, even) {
	var additionalDivider = 1;
	if (even) {
		additionalDivider = 2;
	}
	var howMuchIsDividersInMaxValue = 0;
	var index = 0;
	const maxDegree = getMaxDegreeOfNumber(maxValue, defaultDivider, additionalDivider);
	var divider = defaultDivider * additionalDivider;
	while (index < maxDegree) {
		howMuchIsDividersInMaxValue = howMuchIsDividersInMaxValue + getCountOfDivider(maxValue, divider);
		divider = divider * defaultDivider;
		index++;
	}
	return howMuchIsDividersInMaxValue;
}

function isEven(value) {
	return value % 2 === 0;
}

function parseExpression(expression) {
	var expressionConfig = {};
	const countExclamationPoints = (expression.match(new RegExp("!", "g")) || []).length;
	expression.replace('!', '');
	const maxValue = parseInt(expression, 10);
	if (countExclamationPoints === 1) {
		expressionConfig.countOf5 = getCountOfDividers(5, maxValue);
		expressionConfig.countOf2 = getCountOfDividers(2, maxValue);
	} else {
		if (isEven(maxValue)) {
			expressionConfig.countOf5 = getCountOfDividers(5, maxValue, true);
			expressionConfig.countOf2 = getCountOfDividers(2, maxValue);
		} else {
			expressionConfig.countOf5 = getCountOfDividers(5, maxValue) - getCountOfDividers(5, maxValue, true);
			expressionConfig.countOf2 = 0;
		}
	}
	return expressionConfig;
}

function parseExpressions(expressions) {
	var expressionsConfig = [];
	expressions.forEach(function(expressionConfig) {
		expressionsConfig.push(parseExpression(expressionConfig));
	});
	return expressionsConfig;
}

module.exports = function zeros(expression) {
  const expressions = expression.split('*');
  const expressionsConfig = parseExpressions(expressions);
  var countOf2 = 0;
  var countOf5 = 0;
  expressionsConfig.forEach(function(expressionConfig) {
  	countOf2 = countOf2 + expressionConfig.countOf2;
  	countOf5 = countOf5 + expressionConfig.countOf5;
  });
  if (countOf2 < countOf5) {
  	return countOf2;
  } else {
	return countOf5;
  }
}
