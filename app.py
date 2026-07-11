import streamlit as st

from constants import APP_NAME, CATEGORY_MERCHANTS

from data_loader import load_cards

from recommendation import RecommendationEngine

# ------------------------------------
# Page Configuration
# ------------------------------------

st.set_page_config(page_title=APP_NAME, page_icon="💳", layout="centered")

cards = load_cards()

# ------------------------------------
# Header
# ------------------------------------

st.title("💳 IntelliCardViser")

st.caption("Find the best credit card for every purchase.")

st.divider()

# ------------------------------------
# Inputs
# ------------------------------------

category = st.selectbox("Category", list(CATEGORY_MERCHANTS.keys()))

merchant = st.selectbox("Merchant", CATEGORY_MERCHANTS[category])

amount = st.number_input("Amount (₹)", min_value=1, value=1000, step=100)

st.divider()

# ------------------------------------
# Recommendation
# ------------------------------------

if st.button("🚀 Recommend Best Card", use_container_width=True):

    recommendations = RecommendationEngine.recommend(cards, category, merchant, amount)

    if len(recommendations) == 0:

        st.warning("No matching offer found.")

        st.stop()

    winner = recommendations[0]

    st.success("🏆 Best Recommendation")

    st.metric("Recommended Card", winner.card_name)

    st.metric("Estimated Savings", f"₹{winner.estimated_savings:.2f}")

    st.metric("Benefit", f"{winner.benefit_value}% {winner.benefit_type}")

    st.metric("Confidence", f"{winner.confidence}%")

    st.info(winner.reason)

    st.divider()

    st.subheader("Comparison")

    comparison = []

    for rec in recommendations:

        comparison.append(
            {
                "Card": rec.card_name,
                "Savings (₹)": rec.estimated_savings,
                "Benefit": f"{rec.benefit_value}%",
                "Type": rec.benefit_type,
                "Confidence": f"{rec.confidence}%",
            }
        )

    st.dataframe(comparison, use_container_width=True, hide_index=True)
