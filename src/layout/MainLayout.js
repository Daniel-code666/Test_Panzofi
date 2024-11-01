import React from 'react'
import { SideMenu, Post } from '../components'
import './styles.css'

export function MainLayout(props) {
    return (
        <div className='admin-layout'>
            <div className='admin-layout__content'>
                <Post />
            </div>

            <div className='admin-layout__sidebar'>
                <SideMenu />
            </div>
        </div>
    )
}