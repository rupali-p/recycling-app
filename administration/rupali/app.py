import streamlit as st

# Import the necessary libraries and functions for image processing and model inference

# Main Streamlit app
def main():
   # Add the top navigation bar
    st.markdown('<div class="topnav flex justify-start"><a href="app">About Us</a><span style="color:#1D7874;">|</span><a href="check_nail">Check Your Nails</a></div>', unsafe_allow_html=True)
    # Add the empty colored div
    st.markdown('<div class="empty-div"></div>', unsafe_allow_html=True)
    # Use Markdown
    # Set the title of the app
    st.markdown('<h2 class="accent-font px-20-50">About us</h2>', unsafe_allow_html=True)
    #Add the context
    st.markdown('<p class="text-black px-00-50">Cupcake ipsum dolor sit amet chocolate oat cake pudding. Oat cake shortbread wafer dragée muffin. Toffee I love sweet roll pie jelly-o lollipop. Shortbread jelly-o I love cheesecake cookie ice cream jelly-o. Icing caramels danish cake I love I love <big>Ilove</big> cookie.Cupcake ipsum dolor sit amet chocolate oat cake pudding. Oat cake shortbread wafer dragée muffin. Toffee I love sweet roll pie jelly-o lollipop. Shortbread jelly-o I love cheesecake cookie ice cream jelly-o. Icing caramels danish cake I love I love <big>Ilove</big> cookie.Cupcake ipsum dolor sit amet chocolate oat cake pudding. Oat cake shortbread wafer dragée muffin. Toffee I love sweet roll pie jelly-o lollipop. Shortbread jelly-o I love cheesecake cookie ice cream jelly-o. Icing caramels danish cake I love I love <big>Ilove</big> cookie.Cupcake ipsum dolor sit amet chocolate oat cake pudding. Oat cake shortbread wafer dragée muffin. Toffee I love sweet roll pie jelly-o lollipop. Shortbread jelly-o I love cheesecake cookie ice cream jelly-o. Icing caramels danish cake I love I love <big>Ilove</big> cookie.Cupcake ipsum dolor sit amet chocolate oat cake pudding. Oat cake shortbread wafer dragée muffin. Toffee I love sweet roll pie jelly-o lollipop. Shortbread jelly-o I love cheesecake cookie ice cream jelly-o. Icing caramels danish cake I love I love <big>Ilove</big> cookie.</p>', unsafe_allow_html=True)
    # Add the footer
    st.markdown('<div class="empty-div text-white px-00-50 ">This is a footer</div>', unsafe_allow_html=True)

# Run the app
if __name__ == '__main__':
    main()



#style

st.markdown(
    """
    <style>
    .stApp {
        margin: 0;
        font-family: 'Roboto', sans-serif;
        background-color: lightblue;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 1rem;
    }

    .stApp header {
        background-color: #1D7874;
        color: #ffffff;
    }

    .topnav {
        background-color: lightblue;
        overflow: hidden;
        font-size: 150%;
    }
    .topnav a {
        color: #1D7874;
        text-decoration: none;
        padding: 00px 50px;
    }
    .topnav a:hover {
        background-color: #ffffff;
    }

    .empty-div {
        background-color: #1D7874;
        height: 20px;
    }

    .css-1y4p8pa {
        max-width: none !important;
        padding: 45px 00px !important;
    }

    .bg-light-blue-100 {
        background-color: lightblue;
    }

    .accent {
        background-color: #1D7874;
    }

    .accent-font {
        color: #1D7874;
    }

    .p {
        color: #ffffff;
        padding: 45px 00px;
    }

    .text-white {
        color: white;
    }

    .text-black {
        color: black;
    }

    .block {
        display: block;
    }

    .inline-block {
        display: inline-block;
    }

    .inline {
        display: inline;
    }

    .hidden {
        display: none;
    }

    .flex {
        display: flex;
    }

    .justify-between {
        justify-content: space-between;
    }

    .justify-center {
        justify-content: center;
    }

    .justify-start {
        justify-content: start;
    }

    .item-center {
        align-items: center;
    }

    .px-00-50 {
        padding: 00px 50px;
    }

    .px-20-00 {
        padding: 20px 00px;
    }

    .px-20-50 {
        padding: 20px 50px;
    }

    .font-roboto {
        font-family: 'Roboto', sans-serif;
    }

    .body-padding-10-50 {
        padding: 05px 50px;
    }

    .btn {
        /* height: 175%; */
        width: 77%;
        background-color: #1D7874;
    }

    .column {
        float: left;
        width: 50%;
    }

    .column-3 {
        width: 33.3%;
    }

    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    .margin-10 {
        margin: 10px;
    }

    img {
        border: 5px solid #1D7874;
    }
    </style>
    """,
    unsafe_allow_html=True
)

