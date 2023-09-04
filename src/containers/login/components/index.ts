import styled from 'styled-components';
import GridContainer from 'src/components/gridContainer';

const Container = styled(GridContainer)`
    padding: 0;
    margin: auto;
`;

const LoginPanel = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Footer = styled.div`
    text-align: center;
    color: #2d3e4e;
`;

export {
  Container,
  LoginPanel,
  Footer,
};
