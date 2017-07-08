import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Demo from '../pageComponents/Demo';
import * as demoActions from '../../actions/demoActions';

function mapStateToProps(state) {
  return {
    ...state,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(demoActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
