import styled from 'styled-components';
import GridContainer from 'src/components/gridContainer';

const Container = styled(GridContainer)`
    padding: 0;
    place-content: center;
    flex: 1;

    .statistics-card {
      padding: 0;
      min-width: 800px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      & > div {
        padding: 0;
      }
    }
    .statistics-item-group {
      display: grid;
      grid-template: auto / 1fr auto 1fr auto 1fr;
    }
    .statistics-item {
      padding: 16px;
      text-align: center;
      box-shadow: none;
      display: grid;
      grid-template: auto 1fr / auto;
      height: 100px;

      & > div {
        padding: 0;
      }

      & div.title {
        font-size: 22px;
        color: #757575;
      }

      & div.value {
        font-size: 56px;
        color: #2d3e4e;
        margin-top: 10px;
        font-weight: 700;
      }

      &:hover {
        background-color: #ffcc00 !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
        transition: background-color 0.3s, transform 0.3s;
      }
    }
`;

export {
  Container,
};
