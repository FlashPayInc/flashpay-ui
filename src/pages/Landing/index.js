import React from "react";

const Home = () => {
  return (
    <div className="landing_container">
      <div className="landing_nav">
        <img src="img/svg/logo.svg" alt="" />
        <button className="continue_button">Go to Flashpay app</button>
      </div>
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero__block">
          <div className="hero_text">
            <p className="main">
              Collect payments <br /> in crypto asset.
            </p>
            <p className="sub">
              Blockchain required some algo-traded flippening, but when Monero
              waited many segregated witness for few altcoin, it should be the
              robust proof of stake for the delegated proof-of-stake.
            </p>
          </div>

          <button className="continue_button">Go to Flashpay app</button>

          <div className="built_on">
            <p>Built on</p>
            <svg
              width="106"
              height="30"
              viewBox="0 0 106 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.0334 6.2437V23.4606H24.5742V6.2437H28.0334Z"
                fill="#6D6D6D"
              />
              <path
                d="M42.1519 11.8523V23.4988C42.1519 27.1138 39.3789 29.3363 35.9855 29.3363C32.7143 29.3363 30.2703 27.276 30.0353 24.3668L33.4851 24.3858C33.6261 25.6258 34.6977 26.16 36.1077 26.16C37.4425 26.16 38.6833 25.4351 38.6833 23.5465V22.0585C37.7997 22.6403 36.6717 22.9837 35.4121 22.9837C32.2537 22.9837 29.7251 20.3892 29.7251 17.4037C29.7251 13.9317 32.2631 11.6043 35.4121 11.6043C36.6811 11.6043 37.7997 11.9477 38.6833 12.5295V11.9L42.1519 11.8523ZM38.6927 18.7105V15.8775C37.9877 14.8378 37.0101 14.4945 36.0419 14.4945C34.3405 14.4945 33.1561 15.6486 33.1561 17.4037C33.1561 18.6914 34.3405 20.1031 36.0419 20.1031C37.0101 20.0935 37.9877 19.7406 38.6927 18.7105Z"
                fill="#6D6D6D"
              />
              <path
                d="M55.9516 17.5182C55.9516 21.1046 53.3384 23.6609 49.8322 23.6609C46.2978 23.6609 43.6846 21.1046 43.6846 17.5182C43.6846 13.9603 46.2978 11.3563 49.8322 11.3563C53.3384 11.3563 55.9516 13.9603 55.9516 17.5182ZM52.6146 17.5182C52.6146 15.8298 51.5242 14.4658 49.8322 14.4658C48.1214 14.4658 47.031 15.8298 47.031 17.5182C47.031 19.2542 48.1214 20.5514 49.8322 20.5514C51.5148 20.5418 52.6146 19.2542 52.6146 17.5182Z"
                fill="#6D6D6D"
              />
              <path
                d="M77.4302 11.8714V23.4415L74.0368 23.4606V22.8025C73.1532 23.3843 72.0252 23.7468 70.7656 23.7468C67.6072 23.7468 65.0786 21.0283 65.0786 17.6803C65.0786 14.3132 67.6166 11.5948 70.7656 11.5948C72.0346 11.5948 73.1532 11.9572 74.0368 12.5391V11.8809L77.4302 11.8714ZM74.0368 19.4545V15.9062C73.3224 14.876 72.326 14.5899 71.3296 14.5899C69.5906 14.5899 68.3874 16.0015 68.3874 17.6899C68.3874 19.3591 69.5906 20.7708 71.3296 20.7708C72.326 20.7612 73.3224 20.4846 74.0368 19.4545Z"
                fill="#6D6D6D"
              />
              <path
                d="M91.3798 17.1748V23.4606H88.0428V17.5849C88.0428 15.6963 87.1122 14.6948 85.4578 14.6948C84.593 14.6948 83.6436 15.2003 82.8258 16.1732V23.4606H79.4136V11.8905H82.8258V12.768C83.7564 12.0145 84.8374 11.6043 86.1252 11.6043C89.1708 11.6043 91.3798 13.7791 91.3798 17.1748Z"
                fill="#6D6D6D"
              />
              <path
                d="M22.9949 23.4511H19.4699L17.1763 14.7997L12.2413 23.4511H8.30273L15.9167 10.0591L14.6947 5.40431L4.42053 23.4606H0.481934L13.5009 0.568314H16.9507L18.4641 6.25324H22.0267L19.5921 10.5455L22.9949 23.4511Z"
                fill="#6D6D6D"
              />
              <path
                d="M105.161 6.2437V23.4606H101.701V22.8025C100.818 23.3843 99.6898 23.7468 98.4302 23.7468C95.2718 23.7468 92.7432 21.0283 92.7432 17.6612C92.7432 14.3132 95.2812 11.5948 98.4302 11.5948C99.6992 11.5948 100.818 11.9572 101.701 12.5391V6.23416L105.161 6.2437ZM101.701 19.464V15.8871C100.978 14.8474 99.9718 14.5612 98.9754 14.5612C97.227 14.5612 96.0144 15.9825 96.0144 17.6612C96.0144 19.3686 97.227 20.7899 98.9754 20.7899C99.9718 20.7899 100.978 20.5037 101.701 19.464Z"
                fill="#6D6D6D"
              />
              <path
                d="M64.4586 14.8092C63.7066 14.9046 61.9394 14.9905 60.9054 16.4403V23.4702H57.4932V11.9095H60.9054V12.7775C61.6856 12.1003 62.8606 11.6997 64.4586 11.8618"
                fill="#6D6D6D"
              />
            </svg>
          </div>
        </div>

        <div className="hero__block">
          <div className="hero_img">
            <img src="img/png/hero-mockup.png" alt="" />
          </div>

          <div className="background_div">
            <img src="img/svg/morph.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="offers">
        <p className="offers_header">Collect payments in crypto asset.</p>
        <div className="offer_blocks">
          <div className="offer_block">
            <div className="offer_icon">
              <img src="img/svg/rocket.svg" alt="" />
            </div>
            <p className="offer_text_main">Fast</p>
            <p className="offer_text_sub">
              Users are chosen at random, regardless of the quantity of the
              assets they have pledged to the blockchain, ensuring that everyone
              has a fair opportunity.
            </p>
          </div>
          <div className="offer_block">
            <div className="offer_icon">
              <img src="img/svg/click.svg" alt="" />
            </div>
            <p className="offer_text_main">Fast</p>
            <p className="offer_text_sub">
              Algorand’s consensus protocol works by selecting a block proposer
              and a set of voting committees at each block round, to propose a
              block and validate.
            </p>
          </div>
          <div className="offer_block">
            <div className="offer_icon">
              <img src="img/svg/shield.svg" alt="" />
            </div>
            <p className="offer_text_main">Secure</p>
            <p className="offer_text_sub">
              PPoS is a highly democratized PoS consensus mechanism with a low
              minimum staking requirement for participating in and securing.
            </p>
          </div>
        </div>
      </div>

      <div className="features">
        <ul className="features_list">
          <li>
            <p>Collect payments in crypto asset.</p>
          </li>
          <li className="active">
            <p>Create payment links for customers.</p>
          </li>
          <li>
            <p>Connect your Algo wallet.</p>
          </li>
          <li>
            <p>See your transactions.</p>
          </li>
        </ul>

        <div className="features_img">
          <img src="img/svg/features-mockup.svg" alt="" />
        </div>
      </div>

      <div className="api_preview">
        <p className="section_header">Let’s help make asset collection easy.</p>

        <div className="section_content">
          <div className="section_text">
            <p className="main">API</p>
            <div className="sub">
              On the other hand, we denounce with righteous indignation and
              dislike men who are so beguiled and demoralized by the charms of
              pleasure of the moment, so blinded by desire, that they cannot
              foresee
            </div>
            <p className="main second_child">Front-end Integration</p>
            <p className="sub">
              uestion Marks and devious Semikoli, but the Little Blind Text
              didn’t listen. She packed her seven versalia, put her initial into
              the belt and made herself on the way. When she reached the first
              hills of the Italic Mountains.
            </p>
          </div>

          <div className="section_img">
            <img src="img/svg/api-preview.svg" alt="" />
          </div>
        </div>
      </div>
      <footer>
        <div className="footer_design_cover">
          <div className="foot_design">
            <div className="section_cont">
              <p className="section_title">
                Create payment links for <br /> customers.
              </p>
              <button>Go to app.</button>
            </div>
            <img src="img/svg/footer-mask.svg" alt="" />
          </div>
        </div>

        <div className="foot">
          <div className="foot_row">
            <img src="img/svg/logo.svg" alt="" className="foot_logo" />
            <div className="footer_links">
              <a href="#">Features</a>
              <a href="#">About Us</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <div className="horLine" />
          <p className="copyrights">&copy; 2022 Flashpay</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
