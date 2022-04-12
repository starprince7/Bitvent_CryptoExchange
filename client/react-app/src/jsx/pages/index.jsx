import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import TypeWriterEffect from 'react-typewriter-effect';
import CurrencyFormat from 'react-currency-format'
import { connect } from 'react-redux'
// Redux actions
import { fetchCrypto } from '../../redux/crypto_data/actions'
// component
import BuyCrypto from '../element/BuyCrypto';
import SellCrypto from '../element/SellCrypto';
import Header1 from './../layout/header1';
import Footer1 from './../layout/footer1';
import Bottom from './../element/bottom';
import BtcChart from '../charts/btc';
import BinanceChart from '../charts/bnb';
import AdaChart from '../charts/ada';
import EthChart from '../charts/eth';
import LtcChart from '../charts/ltc';
import DogeChart from '../charts/doge';
import XrpChart from '../charts/xrp';
import XtzChart from '../charts/xtz';
import Testimonial from '../element/testimonial';
// Logo Import
import AppleLogo from './../../images/apple.svg'
import AndroidLogo from './../../images/android.svg'
import MobileAppImage from './../../images/app.png'
import BNB from './../../icons/svg-icons/BNB.svg'
import SOL from './../../icons/image-icon/solana.jpg'
// Hero image
import BitcoinHeroImage from './../../images/background/bitcoin_hero_bg.webp'




function Homepage({ crypto, fetchCrypto }) {
    const [btc, setBtc] = useState(null)
    const [eth, setEth] = useState(null)
    const [ltc, setLtc] = useState(null)
    const [bnb, setBnb] = useState(null)
    const [ada, setAda] = useState(null)
    const [xrp, setXrp] = useState(null)
    const [doge, setDoge] = useState(null)
    const [sol, setSol] = useState(null)
    // When DOM is full loaded Type-writer should show
    const [pageloaded, setPageLoaded] = useState(false)

    useEffect(() => {
        crypto && crypto.forEach(coin => {
            if(coin.USD.FROMSYMBOL === 'BTC') setBtc(coin)
            if(coin.USD.FROMSYMBOL === 'ETH') setEth(coin)
            if(coin.USD.FROMSYMBOL === 'LTC') setLtc(coin)
            if(coin.USD.FROMSYMBOL === 'BNB') setBnb(coin)
            if(coin.USD.FROMSYMBOL === 'ADA') setAda(coin)
            if(coin.USD.FROMSYMBOL === 'XRP') setXrp(coin)
            if(coin.USD.FROMSYMBOL === 'SOL') setSol(coin)
            if(coin.USD.FROMSYMBOL === 'DOGE') setDoge(coin)
        })
    }, [crypto])

    useEffect(() => {
        // Call crypto data here, handled by the redux actions.
        fetchCrypto()

        window.addEventListener('DOMContentLoaded', () => {
            setPageLoaded(true)
        })
    }, [])

    return (
        <>
            <Header1 />
            <div className="intro">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-xl-6 col-lg-6 col-12">
                            <div className="intro-content">
                                {/* <div className="text-primary"><strong>Bull, sell, exchange</strong></div> */}
                                <h1>
                                    {
                                        pageloaded && (
                                            <TypeWriterEffect
                                                startDelay={1000}
                                                cursorColor="black"
                                                typeSpeed={100}
                                                multiText={["Buy crypto at true cost", "Buy quickly and easily", "Crypto made easy"]}
                                                multiTextDelay={3000}
                                                hideCursorAfterText={true}
                                            />
                                        )
                                    }
                                </h1>
                                <p>Fast and secure way to purchase or exchange cryptocurrencies</p>
                            </div>

                            <div className="intro-btn sm-text-left">
                                <a href='#Exchange' className="btn btn-primary">Buy crypto</a>
                                {/* <a href='#Exchange' className="btn btn-outline-primary">Sell crypto</a> */}
                                <div className="arrow_icon_container text-center mt-4 lg-d-none">
                                    <p>Scroll</p>
                                    <i class="fas fa-arrow-down bold text-secondary"></i>
                                </div>
                            </div>
                        </div>
                        {/* Exchange Form Was Here! */}
                        <div className="col-xl-6 col-lg-6 col-12">
                            <div className="floating_image">
                                <img className='intro_hero_image' src={ BitcoinHeroImage } alt="hero" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="Exchange" className="price-grid section-padding container_exchange">
                <div className="container">
                    <div className="text-center mt-4 mb-4">
                        <h2 className="text-center">Simply buy or sell with ease.</h2>
                        <p>Use your credit card, payment app, or bank
                            account to buy Bitcoin,
                            Ethereum, Dogecoin and other select cryptocurrencies,<br /> it only takes
                            3 easy and simple steps.
                        </p>
                    </div>
                    <div className=" mb-5 col-12 d-flex align-items-center justify-content-center">
                    {/* Exchange Form ============================ */}
                        <div data-aos="fade-up" className="intro-form-exchange">
                            <Tabs
                                defaultActiveKey="buy"
                                variant='pills'
                                className="text-primary"
                            >
                                <Tab eventKey="buy" title="Buy">
                                    <BuyCrypto />
                                </Tab>
                                <Tab eventKey="sell" title="Sell">
                                    <SellCrypto />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
            <div className="price-grid section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="media">
                                        <span><i className="cc BTC"></i></span>
                                        <div className="media-body">
                                            Bitcoin (BTC)
                                    </div>
                                    </div>
                                    <p className="mb-0"> 24h</p>
                                </div>
                                <div className="card-body">
                                    <h3>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <strong>{value}</strong>
                                                </>
                                            )}
                                            value={btc ? btc.USD.PRICE : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                            prefix={"$"}
                                        />
                                    </h3>
                                    <span>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <span className={`${Math.sign(Number( btc?.USD.CHANGEPCTHOUR)) === -1 ||
                                                     Math.sign(Number(btc?.USD.CHANGEPCTHOUR)) === 0  ? 'text-danger' : 'text-success'}`}>
                                                    { value }%</span>
                                                </>
                                            )}
                                            value={btc ? btc?.USD.CHANGEPCTHOUR : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                        />
                                    </span>
                                    <BtcChart />
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="media">
                                        <span><i className="cc ETH"></i></span>
                                        <div className="media-body">
                                            Ethereum (ETH)
                                    </div>
                                    </div>
                                    <p className="mb-0"> 24h</p>
                                </div>
                                <div className="card-body">
                                    <h3>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <strong>{value}</strong>
                                                </>
                                            )}
                                            value={eth ? eth.USD.PRICE : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                            prefix={"$"}
                                        />
                                    </h3>
                                    <span>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <span className={`${Math.sign(Number(eth?.USD.CHANGEPCTHOUR)) === -1 ||
                                                     Math.sign(Number(eth?.USD.CHANGEPCTHOUR)) === 0  ? 'text-danger' : 'text-success'}`}>
                                                    { value }%</span>
                                                </>
                                            )}
                                            value={eth ? eth.USD.CHANGEPCTHOUR : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                        />
                                    </span>

                                    <EthChart />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="media">
                                        <span><i className="cc LTC"></i></span>
                                        <div className="media-body">
                                            Litecoin (LTC)
                                    </div>
                                    </div>
                                    <p className="mb-0"> 24h</p>
                                </div>
                                <div className="card-body">
                                <h3>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <strong>{value}</strong>
                                                </>
                                            )}
                                            value={ltc ? ltc.USD.PRICE : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                            prefix={"$"}
                                        />
                                    </h3>
                                    <span>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <span className={`${Math.sign(Number(ltc?.USD.CHANGEPCTHOUR)) === -1 ||
                                                     Math.sign(Number(ltc?.USD.CHANGEPCTHOUR)) === 0  ? 'text-danger' : 'text-success'}`}>
                                                    { value }%</span>
                                                </>
                                            )}
                                            value={ltc ? ltc.change : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                        />
                                    </span>
                                    <LtcChart />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="media crypto_coin_logo">
                                        <img src={ BNB } alt="coin logo" />
                                        <div className="media-body">
                                            Binance Coin (BNB)
                                    </div>
                                    </div>
                                    <p className="mb-0"> 24h</p>
                                </div>
                                <div className="card-body">
                                    <h3>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <strong>{value}</strong>
                                                </>
                                            )}
                                            value={bnb ? bnb.USD.PRICE : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                            prefix={"$"}
                                        />
                                    </h3>
                                    <span>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <span className={`${Math.sign(Number(bnb?.USD.CHANGEPCTHOUR)) === -1 ||
                                                     Math.sign(Number(bnb?.USD.CHANGEPCTHOUR)) === 0  ? 'text-danger' : 'text-success'}`}>
                                                    { value }%</span>
                                                </>
                                            )}
                                            value={bnb ? bnb.USD.CHANGEPCTHOUR : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                        />
                                    </span>
                                    <BinanceChart />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="media">
                                        <span><i className="cc XRP"></i></span>
                                        <div className="media-body">
                                            Ripple (XRP)
                                    </div>
                                    </div>
                                    <p className="mb-0"> 24h</p>
                                </div>
                                <div className="card-body">
                                    <h3>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <strong>{value}</strong>
                                                </>
                                            )}
                                            value={xrp ? xrp.USD.PRICE : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                            prefix={"$"}
                                        />
                                    </h3>
                                    <span>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <span className={`${Math.sign(Number(xrp?.USD.CHANGEPCTHOUR)) === -1 ||
                                                     Math.sign(Number(xrp?.USD.CHANGEPCTHOUR)) === 0  ? 'text-danger' : 'text-success'}`}>
                                                    { value }%</span>
                                                </>
                                            )}
                                            value={xrp ? xrp.USD.CHANGEPCTHOUR : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                        />
                                    </span>
                                    <XrpChart />
                                </div>
                            </div>
                        </div>


                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="media">
                                        <span><i className="cc ADA"></i></span>
                                        <div className="media-body">
                                            Cardano (ADA)
                                    </div>
                                    </div>
                                    <p className="mb-0"> 24h</p>
                                </div>
                                <div className="card-body">
                                    <h3>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <strong>{value}</strong>
                                                </>
                                            )}
                                            value={ada ? ada.USD.PRICE : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                            prefix={"$"}
                                        />
                                    </h3>
                                    <span>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <span className={`${Math.sign(Number(ada?.USD.CHANGEPCTHOUR)) === -1 ||
                                                     Math.sign(Number(ada?.USD.CHANGEPCTHOUR)) === 0  ? 'text-danger' : 'text-success'}`}>
                                                    { value }%</span>
                                                </>
                                            )}
                                            value={ada ? ada.USD.CHANGEPCTHOUR : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                        />
                                    </span>
                                    <AdaChart />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="media">
                                        <span><i className="cc DOGE"></i></span>
                                        <div className="media-body">
                                            Doge Coin (DOGE)
                                    </div>
                                    </div>
                                    <p className="mb-0"> 24h</p>
                                </div>
                                <div className="card-body">
                                    <h3>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <strong>{value}</strong>
                                                </>
                                            )}
                                            value={doge ? doge.USD.PRICE : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                        />
                                    </h3>
                                    <span>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <span className={`${Math.sign(Number(doge?.USD.CHANGEPCTHOUR)) === -1 ||
                                                     Math.sign(Number(doge?.USD.CHANGEPCTHOUR)) === 0  ? 'text-danger' : 'text-success'}`}>
                                                    { value }%</span>
                                                </>
                                            )}
                                            value={doge ? doge.USD.CHANGEPCTHOUR : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                        />
                                    </span>
                                    <DogeChart />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <div className="media crypto_coin_logo">
                                        <img src={ SOL } alt="coin logo" />
                                        <div className="media-body">
                                            Solana (SOL)
                                    </div>
                                    </div>
                                    <p className="mb-0"> 24h</p>
                                </div>
                                <div className="card-body">
                                    <h3>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <strong>{value}</strong>
                                                </>
                                            )}
                                            value={sol ? sol.USD.PRICE : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                            prefix={"$"}
                                        />
                                    </h3>
                                    <span>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <span className={`${Math.sign(Number(sol?.USD.CHANGEPCTHOUR)) === -1 ||
                                                     Math.sign(Number(sol?.USD.CHANGEPCTHOUR)) === 0  ? 'text-danger' : 'text-success'}`}>
                                                    { value }%</span>
                                                </>
                                            )}
                                            value={sol ? sol.USD.CHANGEPCTHOUR : 0}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={true}
                                            displayType={"text"}
                                        />
                                    </span>
                                    <XtzChart />
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>

            <div className="trade-app section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <div className="section-title text-center">
                                <h2 data-aos='flip-down'>Trade. Anywhere</h2>
                                <p data-aos='flip-up'> All of our products are ready to go, easy to use and offer great value to any kind of
                                    business
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="card trade-app-content">
                                <div data-aos='zoom-up' className="card-body">
                                    <span><i className="la la-mobile"></i></span>
                                    <h4 className="card-title">Mobile</h4>
                                    <p>All the power of Bitvent's cryptocurrency exchange, in the palm of your hand. Download
                                        the
                                    Bitvent mobile crypto trading app today</p>

                                    <Link to={'#'}> Know More <i className="la la-arrow-right"></i> </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="card trade-app-content">
                                <div data-aos='zoom-up' className="card-body">
                                    <span><i className="la la-desktop"></i></span>
                                    <h4 className="card-title">Desktop</h4>
                                    <p>Powerful crypto trading platform for those who mean business. The Bitvent crypto
                                        trading
                                    experience, tailor-made for your Windows or MacOS device comming soon.</p>

                                    <Link to={'#'}> Know More <i className="la la-arrow-right"></i> </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div data-aos='zoom-up' className="card trade-app-content">
                                <div className="card-body">
                                    <span><i className="la la-connectdevelop"></i></span>
                                    <h4 className="card-title">API</h4>
                                    <p>The Bitvent API is designed to provide an easy and efficient way to integrate your
                                        trading
                                    application into our platform.</p>

                                    <Link to={'#'}> Know More <i className="la la-arrow-right"></i> </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="col-xl-12">
                            <div className="trusted-business py-5 text-center">
                                <h3 data-aos='fade'>Trusted by Our <strong>Partners & Investors</strong></h3>
                            </div>
                            <div className="brand_container"></div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Testimonial-Section */}
            {/* <div className="testimonial section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <div className="section-title">
                                <h2>What our customer says</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="testimonial-content">
                                <Testimonial />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}


            <div className="appss section-padding">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-xl-7 col-lg-6 col-md-6">
                            <div className="appss-content">
                                <h2  data-aos='fade-up'>Buy & sell using the app, coming soon</h2>
                                <ul>
                                    <li><i className="la la-check"></i> All your digital assets in one place</li>
                                    <li><i className="la la-check"></i> Use Decentralized Apps</li>
                                    <li><i className="la la-check"></i> Pay friends, not addresses</li>
                                </ul>
                                <div className="mt-4">
                                    <Link to={'#'} className="btn btn-primary my-1 waves-effect">
                                        <img src={AndroidLogo} alt="logo" />
                                    </Link>
                                    <Link to={'#'} className="btn btn-primary my-1 waves-effect">
                                        <img src={AppleLogo} alt="logo" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6 col-md-6">
                            <div data-aos='fade-up' className="appss-img">
                                <img className="img-fluid" src={ MobileAppImage } alt="Mobile app" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="blog section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <div className="section-title text-center">
                                <h2 data-aos="flip-up">Stay Informed</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="blog-grid">
                                <div data-aos='zoom-out' className="card">
                                    <img className="img-fluid" src={require('./../../images/blog/1.jpg')} alt="" />
                                    <div className="card-body">
                                        <Link to={"blog-single.html"}>
                                            <h4 className="card-title">Why does Litecoin need MimbleWimble?</h4>
                                        </Link>
                                        <p className="card-text">Cras chinwag brown bread Eaton cracking goal so I said a load
                                            of
                                        old tosh baking cakes.!</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="meta-info">
                                            <Link to={'#'} className="author"><img src={require('./../../images/avatar/5.jpg')} alt="" /> Admin</Link>
                                            <Link to={'#'} className="post-date"><i className="la la-calendar"></i> 31 July, 2019</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="blog-grid">
                                <div data-aos='zoom-out' className="card">
                                    <img className="img-fluid" src={require('./../../images/blog/2.jpg')} alt="" />
                                    <div className="card-body">
                                        <Link href="blog-single.html">
                                            <h4 className="card-title">How to securely store your HD wallet seeds?</h4>
                                        </Link>
                                        <p className="card-text">Cras chinwag brown bread Eaton cracking goal so I said a load
                                            of
                                        old tosh baking cakes.!</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="meta-info">
                                            <Link to={'#'} className="author"><img src={require('./../../images/avatar/6.jpg')} alt="" /> Admin</Link>
                                            <Link to={'#'} className="post-date"><i className="la la-calendar"></i> 31 July, 2019</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="blog-grid">
                                <div data-aos='zoom-out' className="card">
                                    <img className="img-fluid" src={require('./../../images/blog/3.jpg')} alt="" />
                                    <div className="card-body">
                                        <Link href="blog-single.html">
                                            <h4 className="card-title">Exclusive Interview With Xinxi Wang Of Litecoin</h4>
                                        </Link>
                                        <p className="card-text">Cras chinwag brown bread Eaton cracking goal so I said a load
                                            of
                                        old tosh baking cakes.!</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="meta-info">
                                            <Link to={'#'} className="author"><img src={require('./../../images/avatar/7.jpg')} alt="" /> Admin</Link>
                                            <Link to={'#'} className="post-date"><i className="la la-calendar"></i> 31 July, 2019</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Bottom />

            <Footer1 />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        crypto: state.app_state.crypto
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCrypto: () => dispatch(fetchCrypto())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);