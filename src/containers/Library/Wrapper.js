import styled from 'styled-components';

export default styled.div`
  display: flex;
  > div {
    display: flex;
  }

  .library-overview {
    width: 356px;

    .section-header-block {
      .header1 {
        flex: 1 1 0%;
      }

      i {
        cursor: pointer;
      }

      i + i {
        margin-left: 10px;
      }
    }

    .search-container {
      i {
        margin-right: 10px;
        font-size: 16px;
      }

      input {
        color: rgb(124, 124, 124);
        width: 80%;
      }
    }
  }
`;
