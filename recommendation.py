from rule_engine import RuleEngine


class RecommendationEngine:

    @staticmethod
    def recommend(cards, category, merchant, amount):

        recommendations = []

        for card in cards:

            recommendations.extend(
                RuleEngine.evaluate(card, category, merchant, amount)
            )

        recommendations.sort(key=lambda x: x.estimated_savings, reverse=True)

        return recommendations
