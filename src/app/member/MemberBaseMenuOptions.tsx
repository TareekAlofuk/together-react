import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function MemberBaseMenuOptions(): JSX.Element {
    const [activeOption, setActiveOption] = useState('');
    return <div className={'page-menu'}>

        <Link className={'page-menu-option' + ` ${activeOption === 'home' ? 'active' : ''}`}
              onClick={() => setActiveOption('home')}
              to={'/members'}>Home</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'create-wizard' ? 'active' : ''}`}
              onClick={() => setActiveOption('create-wizard')}
              to={'/members/wizard'}>Create Member Wizard</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'recent' ? 'active' : ''}`}
              onClick={() => setActiveOption('recent')}
              to={'/members/recent'}>Recent Members</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'search' ? 'active' : ''}`}
              onClick={() => setActiveOption('search')}
              to={'/members/search'}>Search</Link>
        <Link className={'page-menu-option' + ` ${activeOption === 'expired' ? 'active' : ''}`}
              onClick={() => setActiveOption('expired')}
              to={'/members/expired'}>Expired Memberships</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'will-expire' ? 'active' : ''}`}
              onClick={() => setActiveOption('will-expire')}
              to={'/members/will-expired'}>Nearly Expired Memberships</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'passport-expire' ? 'active' : ''}`}
              onClick={() => setActiveOption('passport-expire')}
              to={'/members/passport-will-expire'}>Passport Will Expire</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'birth-date' ? 'active' : ''}`}
              onClick={() => setActiveOption('birth-date')}
              to={'/members/on-birth-date'}>With BirthDate</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'disabled' ? 'active' : ''}`}
              onClick={() => setActiveOption('disabled')}
              to={'/members/disabled'}>Disabled Membership</Link>

        <Link className={'page-menu-option' + ` ${activeOption === 'archived' ? 'active' : ''}`}
              onClick={() => setActiveOption('archived')}
              to={'/members/archived'}>Archived Members</Link>

    </div>;
}