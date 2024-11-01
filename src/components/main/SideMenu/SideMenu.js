import React, { useEffect, useState } from 'react'
import { Dropdown, Button, Accordion, Icon } from 'semantic-ui-react';
import { usePost } from '../../../hooks/usePost';
import { useTranslation } from 'react-i18next';
import { dictionary } from '../../../internationalization/dictionary';
import './SideMenu.css'

export function SideMenu(props) {
    const { i18n } = useTranslation();

    const { sideMenuData, getSideMenuData } = usePost()
    const [translatedData, setTranslatedData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleAccordionClick = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    useEffect(() => {
        getSideMenuData(1)
    }, [])

    const toggleLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLanguage);
    };

    const translateUsingDictionary = (text, lang) => {
        if (lang === 'es' && text) {
            return text
                .toLowerCase()
                .split(/\s+/)
                .map(word => dictionary[word.replace(/[^a-zA-Z/]/g, '')] || word)
                .join(' ');
        }
        return text;
    };

    useEffect(() => {
        function translateData(data) {
            if (!data) return;
            const translations = data.map(item => ({
                ...item,
                rule: translateUsingDictionary(item.rule, i18n.language),
                description: translateUsingDictionary(item.description, i18n.language),
            }));
            setTranslatedData(translations);
        }

        if (sideMenuData?.second_container) {
            translateData(sideMenuData.second_container);
        }
    }, [sideMenuData, i18n.language]);

    return (
        <div className="side-menu">
            <div className="card-container">
                <div className="card">
                    <div className="card-header"></div>
                    <div className="card-body">
                        <h3 className="card-title">{sideMenuData?.first_container?.topic_title}</h3>
                        <p className="card-subtitle">{sideMenuData?.first_container?.topic_description}</p>
                        <p className="card-date">{new Date(sideMenuData?.first_container?.topic_creation_date).toLocaleDateString()}</p>
                        <div className="card-stats">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Miembros</th>
                                        <th>En Línea</th>
                                        <th>Top</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{sideMenuData?.first_container?.topic_members}</td>
                                        <td>{sideMenuData?.first_container?.topic_active_members}</td>
                                        <td>{sideMenuData?.first_container?.topic_top}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Button primary className="join-button">Join</Button>
                        <hr />
                        <Dropdown
                            placeholder='Opciones'
                            selection
                            options={sideMenuData?.first_container?.community_options}
                            className="options-dropdown"
                        />
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">r/{translateUsingDictionary(sideMenuData?.first_container?.topic_title, i18n.language)}</h3>
                        <Button onClick={toggleLanguage} className="language-toggle">
                            {i18n.language === 'en' ? 'Español' : 'English'}
                        </Button>
                    </div>
                    <div className="card-body">
                        <Accordion styled fluid>
                            {translatedData.map((rule, index) => (
                                <div key={index}>
                                    <Accordion.Title
                                        active={activeIndex === index}
                                        index={index}
                                        onClick={() => handleAccordionClick(index)}
                                    >
                                        <Icon name='dropdown' />
                                        {rule.rule}
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === index}>
                                        <p>{rule.description}</p>
                                    </Accordion.Content>
                                </div>
                            ))}
                        </Accordion>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Info</h3>
                    </div>
                    <div className="card-body">
                        <ul className="info-links">
                            {sideMenuData?.third_container?.infoLinks?.map((link, index) => (
                                <li key={index}>
                                    <a href="#" className="info-link">{link}</a>
                                </li>
                            ))}
                        </ul>
                        <h4 className="related-title">Related reddits</h4>
                        <ul className="related-links">
                            {sideMenuData?.third_container?.relatedLinks?.map((link, index) => (
                                <li key={index}>
                                    <a href="#" className="related-link">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
