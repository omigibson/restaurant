import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapDispatchToProps(actions, dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default (component, actions = {}, mapStateToProps) => {
  return connect(mapStateToProps, mapDispatchToProps.bind(this, actions))(component);
};
