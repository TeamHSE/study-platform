import React from 'react';
import './Welcome.css';
import MainImage from '/assets/main.png'
import Custom2Image from './assets/custom_2.png';

export default function Home() {
    return (
        <main>
            <div className="container">
                <div className="left">
                    <h1>Study<br />Platform</h1>
                    <p>Платформа для продажи тренировочных планов с геймификацией</p>
                    <div className="btn">
                        Начать
                    </div>
                </div>
                <div className="right">
                    <img src={MainImage} alt="Main" className="img-main"/>
                </div>
            </div>
            <div className="container2">
                <img src={Custom2Image} alt="Custom 2" className="custom_2" />
            </div>
            <div className="container3">
                <div className="id1">
                    <h2><a href="https://t.me/aleksnekr">@aleksnekr</a></h2>
                    <p>Role: Front-end</p>
                    <p><a href="mailto:mail@main.com">mail@main.com</a></p>
                    <p><a href="tel:+79000000000">+7 (900) 000-00-00</a></p>
                </div>
                <div className="id2">
                    <h2><a href="https://t.me/dimamrkv">@dimamrkv</a></h2>
                    <p>Role: Front-end</p>
                    <p><a href="mailto:mail@main.com">mail@main.com</a></p>
                    <p><a href="tel:+79000000000">+7 (900) 000-00-00</a></p>
                </div>
                <div className="id3">
                    <h2><a href="https://t.me/zakhar_mol4anov">@zakhar_mol4anov</a></h2>
                    <p>Role: Back-end</p>
                    <p><a href="mailto:mail@main.com">mail@main.com</a></p>
                    <p><a href="tel:+79000000000">+7 (900) 000-00-00</a></p>
                </div>
                <div className="id4">
                    <h2><a href="https://t.me/crazygrisha">@crazygrisha</a></h2>
                    <p>Role: Back-end</p>
                    <p><a href="mailto:mail@main.com">mail@main.com</a></p>
                    <p><a href="tel:+79000000000">+7 (900) 000-00-00</a></p>
                </div>
            </div>
        </main>
    );
}
