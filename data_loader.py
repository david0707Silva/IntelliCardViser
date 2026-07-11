import json
from pathlib import Path

from models import CreditCard, Rule

CARDS_FOLDER = Path("cards")


def load_cards():

    cards = []

    for file in CARDS_FOLDER.glob("*.json"):

        with open(file, "r", encoding="utf-8") as f:
            data = json.load(f)

        rules = []

        for item in data["rules"]:

            rules.append(
                Rule(
                    category=item["category"],
                    benefit_type=item["benefit_type"],
                    benefit_value=item["benefit_value"],
                    eligible_merchants=item["eligible_merchants"],
                )
            )

        cards.append(
            CreditCard(id=data["id"], card_name=data["card_name"], rules=rules)
        )

    return cards
