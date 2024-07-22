import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/Lander.css'

function Homepage() {
    return (
        <div>
            <nav>
                <div className="logo">
                    <img src="logo.png" height={35} alt="" />
                    FormBot
                </div>
                <div className="action">
                    <Link to="/login" className="button">Sign in</Link>
                    <Link to="/register" className="button">Create a FormBot</Link>
                </div>
            </nav>
            <section className="banner">
                <div className="vector">
                    <h1>Build advanced chatbots visually</h1>
                    <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them anywhere on your web/mobile apps and start collecting results like magic.</p>
                    <button>Create a FormBot for free</button>
                    <img className="triangle" src="images/vectors/triangle-single.png" alt="" />
                    <img className="semi-circle" src="images/vectors/semi-circle.png" alt="" />
                </div>
                <img src="images/banner.png" alt="" />
            </section>
            <section className="form-compare">
                <h1>Replace your old school forms with chatbots</h1>
                <p>Typebot is a better way to ask for information. It leads to an increase in customer satisfaction and retention and multiply by 3 your conversion rate compared to classical forms.</p>
                <div className="types">
                    <div className="old-form">
                        <img className="icon" src="icons/bg-cross.png" alt="" />
                        <form>
                            <div className="inputs">
                                <label htmlFor="name">Full name <span>*</span></label>
                                <input type="text" id="name" placeholder="Full name" />
                            </div>
                            <div className="inputs">
                                <label htmlFor="email">Email <span>*</span></label>
                                <input type="text" id="email" placeholder="Email" />
                            </div>
                            <div className="inputs">
                                <label htmlFor="name">What services are you interested in? <span>*</span></label>
                                <div class="input-check">
                                    <input type="checkbox" value="" id="websiteDev" />&nbsp;
                                    <label for="websiteDev">Website Dev</label>
                                </div>
                                <div class="input-check">
                                    <input type="checkbox" value="" id="contentMarketing" />&nbsp;
                                    <label for="contentMarketing">Content Marketing</label>
                                </div>
                                <div class="input-check">
                                    <input type="checkbox" value="" id="socialMedia" />&nbsp;
                                    <label for="socialMedia">Social Media</label>
                                </div>
                                <div class="input-check">
                                    <input type="checkbox" value="" id="UIDesign" />&nbsp;
                                    <label for="UIDesign">UX/UI Design</label>
                                </div>
                            </div>
                            <div className="inputs">
                                <label htmlFor="name">Additional Information <span>*</span></label>
                                <textarea name="" rows={3} id="" placeholder="Additional Information"></textarea>
                            </div>
                            <button type="button">Submit</button>
                        </form>
                    </div>
                    <div className="new-form">
                        <img className="icon" src="icons/bg-tick.png" alt="" />
                        <div className="tryit">
                            <span>Try it out!</span>
                            <img src="icons/arrow-bend.png" alt="" />
                        </div>
                        <div className="chatbox">
                            <div className="admin">
                                <img className="chat-head" src="images/chat-head-admin.png" alt="" />
                                <div className="chat">
                                    <span>Welcome to <b>AA</b> (Awesome Agency)</span>
                                    <span><img src="images/welcome-chat.png" alt="" /></span>
                                </div>
                            </div>
                            <div className="user">
                                <div className="chat">
                                    <span className="click">Hi!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="highlights">
                <div className="main">
                    <img src="images/easy-build.png" height={400} alt="" />
                    <div className="desc">
                        <h3>Easy building experience</h3>
                        <p>All you have to do is drag and drop blocks to create your app. Even if you have custom needs, you can always add custom code.</p>
                    </div>
                </div>
                <div className="main">
                    <div className="desc">
                        <h3>Embed it in a click</h3>
                        <p>Embedding your typebot in your applications is a walk in the park. Typebot gives you several step-by-step platform-specific instructions. Your typebot will always feel "native".</p>
                    </div>
                    <img src="images/easy-embed.png" height={400} alt="" />
                </div>
            </section>
            <div className="integration">
                <div className="wrapper">
                    <div className="images">
                        <img src="images/integration/gmail.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/mailchimp.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/notion.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/webflow.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/wordpress.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/google-calendar.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/n8n.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/google-drive.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/slack.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/shopify.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/airtable.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/google-sheet.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/zapier.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/calendly.svg" alt="" />
                    </div>
                    <div className="images">
                        <img src="images/integration/salesforce.svg" alt="" />
                    </div>
                    <div className="overlay left"></div>
                    <div className="overlay right"></div>
                </div>
                <div className="desc">
                    <h3>Integrate with any platform</h3>
                    <p>Typebot offers several native integrations blocks as well as instructions on how to embed typebot on particular platforms</p>
                </div>
            </div>
            <section className="results">
                <h1>Collect results in real-time</h1>
                <p>One of the main advantage of a chat application is that you collect the user's responses on each question.
                    <br /><b>You won't lose any valuable data.</b></p>
                <div className="chatbox">
                    <div className="admin">
                        <img className="chat-head" src="images/chat-head-admin.png" alt="" />
                        <div className="chat">
                            <span>As you answer this chat, you'll see your result in the real Airtable spreadsheet</span>
                            <span>You can think of it as a guestbook 😂</span>
                            <span>Ready?</span>
                        </div>
                    </div>
                    <div className="user">
                        <div className="chat">
                            <span className="click">Yeah!</span>
                        </div>
                    </div>
                </div>
                <div className="features">
                    <h3>And many more features</h3>
                    <p>Typebot makes form building easy and comes with powerful features</p>
                    <div className="cards">
                        <div className="card">
                            <img src="icons/accessibility.png" alt="" className="icon" />
                            <div className="title">Hidden fields</div>
                            <div className="desc">Include data in your form URL to segment your user and use its data directly in your form.</div>
                        </div>
                        <div className="card">
                            <img src="icons/person-add.png" alt="" className="icon" />
                            <div className="title">Team collaboration</div>
                            <div className="desc">Invite your teammates to work on your typebots with you</div>
                        </div>
                        <div className="card">
                            <img src="icons/git-branch.png" alt="" className="icon" />
                            <div className="title">Link to sub typebots</div>
                            <div className="desc">Reuse your typebots in different parent bots.</div>
                        </div>
                        <div className="card">
                            <img src="icons/calculator.png" alt="" className="icon" />
                            <div className="title">Custom code</div>
                            <div className="desc">Customize everything with your own Javascript & CSS code</div>
                        </div>
                        <div className="card">
                            <img src="icons/social-share.png" alt="" className="icon" />
                            <div className="title">Custom domain</div>
                            <div className="desc">Connect your typebot to the custom URL of your choice</div>
                        </div>
                        <div className="card">
                            <img src="icons/folder-open.png" alt="" className="icon" />
                            <div className="title">Folder management</div>
                            <div className="desc">Organize your typebots in specific folders to keep it clean and work with multiple clients</div>
                        </div>
                    </div>
                </div>
                <div className="brands">
                    <h3>Loved by teams and creators from all around the world</h3>
                    <div className="brand">
                        <img src="images/brands/ibanfirst.png" alt="" />
                        <img src="images/brands/lemlist.png" alt="" />
                        <img src="images/brands/makerlead.png" alt="" />
                        <img src="images/brands/webisharp.png" alt="" />
                        <img src="images/brands/socialhackrs.png" alt="" />
                        <img src="images/brands/pinpoint.png" alt="" />
                        <img src="images/brands/obole.png" alt="" />
                        <img src="images/brands/awwwsome.png" alt="" />
                    </div>
                </div>
            </section>
            <section className="post-banner banner">
                <div className="vector">
                    <h3>Improve conversion and user engagement with FormBots</h3>
                    <button>Create a FormBot</button>
                    <span className="desc">No trial. Generous <b>free</b> plan.</span>
                    <img className="triangle" src="images/vectors/triangle-single.png" alt="" />
                    <img className="semi-circle" src="images/vectors/semi-circle.png" alt="" />
                </div>
            </section>
            <footer className="footer">
                <div className="div">
                    Made with ❤️ by <br />
                    <a href="#">@cuvette</a>
                </div>
                <div className="div">
                    <li><a href="#">Status</a><img className="icon" src="icons/arrow-square.png" alt="" /></li>
                    <li><a href="#">Documentation</a><img className="icon" src="icons/arrow-square.png" alt="" /></li>
                    <li><a href="#">Roadmap</a><img className="icon" src="icons/arrow-square.png" alt="" /></li>
                    <li><a href="#">Pricing</a></li>
                </div>
                <div className="div">
                    <li><a href="#">Discord</a><img className="icon" src="icons/arrow-square.png" alt="" /></li>
                    <li><a href="#">GitHub repository</a><img className="icon" src="icons/arrow-square.png" alt="" /></li>
                    <li><a href="#">Twitter</a><img className="icon" src="icons/arrow-square.png" alt="" /></li>
                    <li><a href="#">LinkedIn</a><img className="icon" src="icons/arrow-square.png" alt="" /></li>
                    <li><a href="#">OSS Friends</a></li>
                </div>
                <div className="div">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </div>
            </footer>
        </div>
    )
}

export default Homepage