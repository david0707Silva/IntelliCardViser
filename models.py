from dataclasses import dataclass
from typing import List


@dataclass
class Rule:
    category: List[str]
    benefit_type: str
    benefit_value: float
    eligible_merchants: List[str]


@dataclass
class CreditCard:
    id: str
    card_name: str
    rules: List[Rule]


@dataclass
class Recommendation:

    card_name: str

    matched_category: str

    matched_merchant: str

    benefit_type: str

    benefit_value: float

    estimated_savings: float

    confidence: int

    reason: str
