import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Button, 
  TextInput } from 'react-native';

import PlanItem from '../../components/PlanItem/PlanItem';
import {addSizing, delSizing} from '../../store/actions/sizingActions';

class Sizing extends Component {

  state = {
    addmodalOpen: false,
    delModalOpen: false,
    newPlanName: '',
    delPlanName: ''
  }

  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'infoButton') {
      alert('Helper info for sizing tab')
    }

    if (buttonId === 'sideDrawerToggle') {
      Navigation.mergeOptions('leftSideDrawer', {
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
    }
  }

  openCalc = (name) => {
    Promise.all([
      Icon.getImageSource('md-arrow-back', 30)
    ]).then(sources => {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'he-designer.SizingCalcScreen',
          passProps: {
            planName: name
          },
          options: {
            topBar: {
              title: {text: name+ ' (Sizing Plan)' },
              leftButtons: [{
                id:'calculationBack',
                icon: sources[0]
              }]
            }
          }
        }
      });
    });
  }

  toggleAddModal = () => {
    console.log('new plan')
    this.setState(prevState => ({
      addmodalOpen: !prevState.addmodalOpen
    }))
  };

  modalNameHandler = (value) => {
    this.setState({newPlanName: value})
  };

  saveNewPlan = () => {
    this.props.addPlan(this.state.newPlanName)
    this.setState({addmodalOpen: false})
  };

  toggleDeleteModal = (plan='') => {
    console.log('del plan')
    console.log(plan)
    this.setState({delPlanName: plan})
    this.setState(prevState => ({
      delModalOpen: !prevState.delModalOpen
    }))
  };

  confirmDel = () => {
    this.props.delPlan(this.state.delPlanName)
    this.setState({delModalOpen: false})
  };

  render() {

    let addModalcontent = this.state.addmodalOpen 
      ? (
        <Modal 
          visible={this.state.addmodalOpen} 
          transparent={true}
          onRequestClose={this.toggleAddModal}
          animationType='slide'>
          <View style={styles.addPlanModal}>
            <Text>Enter new Sizing Plan Name:</Text>
            <TextInput placeholder='Enter name of sizing plan' onChangeText={val => this.modalNameHandler(val)}/>
            <Button color='green' onPress={this.saveNewPlan} title='Add New Sizing Plan'>Hekko</Button>
            <Button color='red' onPress={this.toggleAddModal} title='Dismiss'>Hekko</Button>
          </View>
        </Modal>
      )
      : null

      let delModalcontent = this.state.delModalOpen 
      ? (
        <Modal 
          visible={this.state.delModalOpen} 
          transparent={true}
          onRequestClose={this.toggleDeleteModal}
          animationType='slide'>
          <View style={styles.addPlanModal}>
            <Text>Are you sure you want to delete sizing plan?</Text>
            <Button color='red' onPress={this.confirmDel} title='DELETE'/>
            <Button color='gray' onPress={this.toggleDeleteModal} title='BACK'/>
          </View>
        </Modal>
      )
      : null
      
      let plans = this.props.sizing.planNames.length > 0
        ? this.props.sizing.planNames.map(plan => (
          <PlanItem planName={plan} key={plan} on={this.props.sizing.planDetails[plan]['generated']} onItemPressed={key => this.openCalc(plan)} delete={key => this.toggleDeleteModal(plan)}/>
        ))
        : <Text style={styles.emptyText}>{`No Sizing Plans have been created.
Click on the button below to create a new plan!`}</Text>

    return (
      <View style={styles.sizingContainer}>
        {plans}
        <TouchableOpacity style={styles.addButton} onPress={this.toggleAddModal}>
          <Icon name='md-add-circle-outline' size={45} color='green'/>
        </TouchableOpacity>
        {addModalcontent}
        {delModalcontent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sizingContainer: {
    width: '90%',
    height:'100%',
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 10
  },
  addPlanModal: {
    marginHorizontal: 60,
    marginVertical: 120,
    backgroundColor: 'white',
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5
  },
  emptyText: {
    color: 'grey',
    position: 'absolute',
    textAlign: 'center',
    top: 200,
    right: 22
  }
});

//connect is a function that returns a higher order function
const mapStateToProps = state => {
  return {
      sizing: state.sizing,
  };
};

// dispatch will be called when the function is called
const mapDispatchToProps = dispatch =>{
  return {
      addPlan: (planName) => dispatch(addSizing(planName)),
      delPlan: (key) => dispatch(delSizing(key))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Sizing);
