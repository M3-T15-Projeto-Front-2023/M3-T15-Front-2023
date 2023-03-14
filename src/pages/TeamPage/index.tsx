import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TeamDivStyled } from './style';
import Header from '../../components/Header';
import { GlobalContainer } from '../../components/Header/style';
import { StyledTitle } from '../../styles/typography';
import { TeamList } from '../../components/TeamList';
import { apiFake } from '../../services/api';
import { PokemonContext } from '../../providers/PokemonContext';
import PokeballImgPages from '../../components/HeaderLogin/PokeballImg/lmagePages/lmagePages';
import { motion } from 'framer-motion';

const TeamPage = () => {
  const token = localStorage.getItem('@token');
  const userId = localStorage.getItem('@userID');
  const { setPokemonTeam } = useContext(PokemonContext);

  useEffect(() => {
    if (userId) {
      const getTeam = async () => {
        try {
          const response = await apiFake.get('teams', {
            params: {
              userId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPokemonTeam(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getTeam();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: 1 }}
    >
      <GlobalContainer>
        <Header />

        <TeamDivStyled>
          <div>
            <StyledTitle tag='h2' $fontSize='one'>
              Team
            </StyledTitle>
            <Link className='redirect' to='/home'>
              Voltar para Home
            </Link>
          </div>
          <TeamList />
        </TeamDivStyled>
        <PokeballImgPages />
      </GlobalContainer>
    </motion.div>
  );
};

export default TeamPage;
