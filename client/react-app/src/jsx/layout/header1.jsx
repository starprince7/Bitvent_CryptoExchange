import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import BitventLogo from '../../images/Bitvent-logo/bitvent-logo-text-black.svg'



function Header1() {
    // const header_ref = useRef(null)

    useEffect(() => {
        const header = document.querySelector('.header')
        window.document.addEventListener('scroll', (e) => {
            let scroll_top = e.target.documentElement.scrollTop || e.target.body.scrollTop;

            if (scroll_top > 1) {
                header.style.backgroundColor = 'white'
                header.style.boxShadow = '1px 0 10px 0px #a6a1b6bf'
            }
            else if (scroll_top < 40) {
                header.style.backgroundColor = 'transparent'
                header.style.boxShadow = 'none'
            }
        })
    }, [])

    return (
        <>
            {/* <MarketCurrencyPrices /> */}
            <div className="header" >
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="navigation">
                                <Navbar bg="light" expand="lg">
                                    <a className="navbar-brand text-primary" href='/'>
                                        <img src={BitventLogo}  alt="Logo" />
                                    </a>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse>
                                        <Nav className="ml-auto">

                                            {/* <NavDropdown title="Home">
                                                <NavDropdown.Item><Link to={'/'}>Home 1</Link></NavDropdown.Item>
                                                <NavDropdown.Item><Link to={'/index2'}>Home 2</Link></NavDropdown.Item>
                                            </NavDropdown> */}
                                            <NavDropdown title="Support">
                                                <NavDropdown.Item><Link to={'/contact'}>Contact us</Link></NavDropdown.Item>
                                                <NavDropdown.Item><Link to={'/helpdesk'}>Help Desk</Link></NavDropdown.Item>
                                            </NavDropdown>

                                            {/* <Nav.Item><Link className="text-gray-dark" to={'/about'}>About</Link></Nav.Item> */}
                                            <Nav.Item><Link className="text-gray-dark" to={'/team'}>Investors</Link></Nav.Item>
                                            <Nav.Item><a href='/about' className="text-gray-dark" href={'/about'}>About</a></Nav.Item>

                                        <NavDropdown style={{color: '#506690', fontWeight: '600'}} title="Company">
                                            {/* <NavDropdown.Item><Link to={'/about'}>About us</Link></NavDropdown.Item> */}
                                            {/* <NavDropdown.Item><Link to={'/team'}>Team</Link></NavDropdown.Item> */}
                                            <NavDropdown.Item><Link to={'/faq'}>Faq</Link></NavDropdown.Item>
                                            <NavDropdown.Item><Link to={'/career'}>Career</Link></NavDropdown.Item>
                                        </NavDropdown> 
                                        </Nav>


                                        <div className="signin-btn ml-3 d-none d-md-block">
                                            <Link className="btn btn-primary" to={'#Exchange'}>Buy</Link>
                                        </div>
                                    </Navbar.Collapse>

                                </Navbar>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header1;