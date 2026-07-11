from models import CreditCard, Recommendation


class RuleEngine:

    @staticmethod
    def evaluate(card: CreditCard, category: str, merchant: str, amount: float):

        recommendations = []

        for rule in card.rules:

            # Category Match
            if category not in rule.category:
                continue

            # Merchant Match
            if merchant not in rule.eligible_merchants:
                continue

            estimated_savings = round(amount * rule.benefit_value / 100, 2)

            confidence = 100

            recommendations.append(
                Recommendation(
                    card_name=card.card_name,
                    matched_category=category,
                    matched_merchant=merchant,
                    benefit_type=rule.benefit_type,
                    benefit_value=rule.benefit_value,
                    estimated_savings=estimated_savings,
                    confidence=confidence,
                    reason=f"{rule.benefit_value}% {rule.benefit_type} on {merchant}",
                )
            )

        return recommendations
