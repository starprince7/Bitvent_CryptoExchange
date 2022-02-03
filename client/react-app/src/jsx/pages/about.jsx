import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Row, Col, Card } from 'react-bootstrap'
import Header1 from './../layout/header1';
import Footer1 from './../layout/footer1';
import Bottom from '../element/bottom';

// Image
import about_hero_img from './../../images/about/1.jpg';
import CEO_IMAGE from './../../images/team/001.jpg';
import company_meeting from './../../images/team/002.jpg';
import future_image from './../../images/team/future.jpg';
import Ethereum_on_hand from '../../images/ethereum-on-hand.png'
// Video Pop up
import Popup from '../element/popup'




function About() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
        <Header1 />
            <div className="about-one section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="service-img">
                                <img src={'https://www.bitcoin.com/images/uploads/homepage-buy-sell-lg@2x.png'} alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-6"><br />
                            <div className="service-content m-t-50">
                                <h3>We feel purchasing crypto shouldn't be so difficult.</h3>
                                <p>
                                    Bitvent was formed in 2021 with a single objective in mind: to promote cryptocurrency acceptance.
                                    The goal of the company was to develop a simple and safe software solution that would allow individuals
                                    all around the world to engage in the biggest digital revolution since the internet.
                                </p>
                                
                                <p>
                                    Money is important to us all, whether it's in the form of a wage, a pension, or savings in a piggybank.
                                    The freedom to acquire and employ personal resources is an essential component of human dignity and a
                                    fundamental human right.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="our-ceo py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ceo-content">
                                <div className="media">
                                    <img src={CEO_IMAGE} alt="" className="img-fluid mr-4 rounded-circle" />
                                    
                                </div>
                                <br />
                                <div className="media-body">
                                    <h3>Eric S. Peters</h3>
                                    <span>CEO of WealthWiseFx</span>
                                    <p className="mt-2">Sir Eric S. Peters has over 25+ years of experience working in and around
                                        Financial Technology. He has delivered innovative SaaS systems for some of
                                        today's biggest institutions around payments, identity, and banking
                                        infrastructure. Eric has been in the Blockchain space since 2012 and is
                                        involved in a number of blockchain and fintech businesses both as an investor,
                                        board director, and founder.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="about-two section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <Popup />
                        </div>
                        <div className="col-lg-6">
                            <div className="service-content my-5">
                            <h3>Blockchain technology is the new revolution in today's finance.</h3>
                                <p>We’ve taken a huge challenge and made it into our mission: To create an open financial
                                    system
                                    for the world. To achieve this, we are building a team of smart, creative, passionate
                                    optimists, the kind of people who see opportunity
                                    where others see roadblocks.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="about-two section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="service-img">
                                <img src={Ethereum_on_hand} alt="core value" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="service-content my-5">
                            <h3>Our Core Value</h3>
                                <p>
                                    Our ideals guide our actions and decisions on a daily basis. As a result, our culture is a
                                    microcosm of the society we're attempting to create: open, happy, inquisitive, and fast-paced.
                                    Why Bitvent is a terrific place to work and why we've been successful is due in large part to
                                    our principles. To us, they are much more than words (and we have the emojis to prove it).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                    <div className="service-img">
                        <img src={future_image} alt="" className="img-fluid" />
                    </div>
                </div>
            <div className="about-two section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="service-content my-5">
                            <h3>Our mission</h3>
                                <p>We think achieving our mission is the highest leverage way to bring about more economic
                                    freedom, innovation, efficiency, and equality of opportunity in the world. Each member
                                    of
                                    our team—every engineer, designer, kitchen team member,
                                    lawyer, writer, support coordinator, recruiter, and product manager—plays an important
                                    role
                                    in helping us achieve our mission.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="service-img">
                                <img src={require('./../../images/about/1.jpg')} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="interested-join section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="interested-join-content text-center">
                                <h2>New in the market? So is everyone.</h2>
                                <p>We've simplified the process of buying and selling, get started today.</p>
                                <a href="/#Exchange"><button className="border p-2 my-3">Buy crypto</button></a>
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

export default About;