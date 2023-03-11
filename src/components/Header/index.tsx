/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoExitOutline } from 'react-icons/io5';
import { RiTeamFill, RiHome2Line } from 'react-icons/ri';
import { MdCatchingPokemon } from 'react-icons/md';
import { TbPokeball } from 'react-icons/tb';
import { HeaderContainer, Logo, YellowLine } from './style';
import logo from '../../assets/kenzieDex2.png';
import logout from '../../assets/logout icon.png';
import profile from '../../assets/profile icon.png';
import yellowLine from '../../assets/yellowLine.png';
import { UserContext } from '../../providers/UserContext';

const Header = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { userLogout } = useContext(UserContext);
  const navigate = useNavigate();

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <HeaderContainer>
        <section>
          <Link className='redirect' to='/home'>
            <Logo src={logo} alt='Logo' onClick={refreshPage} />
          </Link>

          <nav>
            <Link to='/home'>
              <RiHome2Line />
            </Link>
            <Link to='/team'>
              <TbPokeball />
            </Link>
            <Link to='/battle'>
              <MdCatchingPokemon />
            </Link>
            <Link to='/' onClick={() => userLogout()}>
              <IoExitOutline />
            </Link>
          </nav>
        </section>
      </HeaderContainer>
      <YellowLine src={yellowLine} alt='yellow line' />
    </>
  );
};

export default Header;
function setAttribute(arg0: string) {
  throw new Error('Function not implemented.');
}
