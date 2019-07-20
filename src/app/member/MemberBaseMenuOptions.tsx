import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function MemberBaseMenuOptions(): JSX.Element {
    const [activeOption, setActiveOption] = useState('home');
    return <div className={'page-menu'}>
        <Link className={'page-menu-option' + ` ${activeOption === 'home' ? 'active' : ''}`}
              onClick={() => setActiveOption('home')}
              to={'/members'}>Home</Link>
        <Link className={'page-menu-option' + ` ${activeOption === 'search' ? 'active' : ''}`}
              onClick={() => setActiveOption('search')}
              to={'/members/search'}>Search</Link>
        <Link className={'page-menu-option' + ` ${activeOption === 'disabled' ? 'active' : ''}`}
              onClick={() => setActiveOption('disabled')}
              to={'/members/disabled'}>Disabled Membership</Link>
        <Link className={'page-menu-option' + ` ${activeOption === 'archived' ? 'active' : ''}`}
              onClick={() => setActiveOption('archived')}
              to={'/members/archived'}>Archived Members</Link>
        <Link className={'page-menu-option' + ` ${activeOption === 'expired' ? 'active' : ''}`}
              onClick={() => setActiveOption('expired')}
              to={'/members/expired'}>Expired Memberships</Link>
        <Link className={'page-menu-option' + ` ${activeOption === 'will-expire' ? 'active' : ''}`}
              onClick={() => setActiveOption('will-expire')}
              to={'/members/will-expired'}>Nearly Expired Memberships</Link>
        <Link className={'page-menu-option' + ` ${activeOption === 'create-wizard' ? 'active' : ''}`}
              onClick={() => setActiveOption('create-wizard')}
              to={'/members/wizard'}>Create Member Wizard</Link>
    </div>;
}