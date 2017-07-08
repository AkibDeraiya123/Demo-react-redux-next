import React from 'react';
import { Grid, Row, Col, Panel, Table } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Head from '../commonComponents/Head';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessId: '',
      businessName: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showErrorMsg = this.showErrorMsg.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, })
  }

  showErrorMsg() {
    if(this.props.errorApiResponse !== "") {
      return (
        <div className="col-md-12" >
          <Grid>
            <Row>
              <Panel header={"Error"} style={{textAlign: "center", marginTop: "10px"}} bsStyle="danger">
                {this.props.errorApiResponse}
              </Panel>
            </Row>
          </Grid>
        </div>
      );
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.businessId === "" && this.state.businessName === "") {
      this.props.actions.noData();
    } else {
      this.props.actions.getResult(this.state.businessId, this.state.businessName);
    }
  }

  render() {

    const basicDetail = [];
    const liquidationsDetail = [];
    const namesDetail = [];
    const auxiliaryNamesDetail = [];
    const addressesDetail = [];
    const companyFormsDetail = [];
    const businessLinesDetail = [];
    const languagesDetail = [];
    const registedOfficesDetail = [];
    const contactDetailsDetail = [];
    const registeredEntriesDetail = [];
    const businessIdChangesDetail = [];


    if(!this.props.isResultNull) {
      const basicDetailData = {
        businessId: this.props.apiData.businessId,
        name: this.props.apiData.name,
        registrationDate: this.props.apiData.registrationDate,
        companyForm: this.props.apiData.companyForm,
        detailsUri: this.props.apiData.detailsUri,
      };
      basicDetail.push(basicDetailData);

      if(this.props.apiData.liquidations.length > 0) {
        this.props.apiData.liquidations.map((title) => {
          return (liquidationsDetail.push({
            version: title.version,
            description: title.description,
            type: title.type,
            registrationDate: title.registrationDate,
            endDate: title.endDate,
            language: title.language,
            source: title.source,
          }));
        });
      }

      if(this.props.apiData.names.length > 0) {
        this.props.apiData.names.map((title) => {
          return (namesDetail.push({
            order: title.order,
            version: title.version,
            name: title.name,
            registrationDate: title.registrationDate,
            endDate: title.endDate,
            source: title.source,
          }));
        });
      }

      if(this.props.apiData.addresses.length > 0) {
        this.props.apiData.addresses.map((title) => {
          return (addressesDetail.push({
            careOf: title.careOf,
            version: title.version,
            street: title.street,
            postCode: title.postCode,
            type: title.type,
            city: title.city,
            country: title.country,
            registrationDate: title.registrationDate,
            endDate: title.endDate,
            language: title.language,
            source: title.source,
          }));
        });
      }

      if(this.props.apiData.companyForms.length > 0) {
        this.props.apiData.companyForms.map((title) => {
          return (companyFormsDetail.push({
            version: title.version,
            name: title.name,
            type: title.type,
            registrationDate: title.registrationDate,
            endDate: title.endDate,
            language: title.language,
            source: title.source,
          }));
        });
      }

      if(this.props.apiData.registedOffices.length > 0) {
        this.props.apiData.registedOffices.map((title) => {
          return (registedOfficesDetail.push({
            order: title.order,
            version: title.version,
            name: title.name,
            registrationDate: title.registrationDate,
            endDate: title.endDate,
            source: title.source,
            language: title.language,
          }));
        });
      }

      if(this.props.apiData.registeredEntries.length > 0) {
        this.props.apiData.registeredEntries.map((title) => {
          return (registeredEntriesDetail.push({
            authority: title.authority,
            register: title.register,
            status: title.status,
            registrationDate: title.registrationDate,
            endDate: title.endDate,
            source: title.source,
            language: title.language,
            description: title.description,
            statusDate: title.statusDate,

          }));
        });
      }

      if(this.props.apiData.contactDetails.length > 0) {
        this.props.apiData.contactDetails.map((title) => {
          return (contactDetailsDetail.push({
            version: title.version,
            value: title.value,
            type: title.type,
            registrationDate: title.registrationDate,
            endDate: title.endDate,
            language: title.language,
            source: title.source,
          }));
        });
      }

    }

    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        <Head />

        <Grid>
          <div className="col-md-12" style={{textAlign: 'center',  marginTop:"20px"}}>
            <h4> Please Enter Your BusinessId or BusinessName</h4>
            <form onSubmit={this.handleSubmit} className="col-md-6" style={{marginLeft: '25%',  marginTop:"10px"}}>
              <div className="form-group">
                <input name="businessId"  onChange={this.handleChange} value={this.state.businessId} placeholder="Please Enter Your Bussiness id" type="text" className="form-control" />
              </div>

              <div style={{marginBottom:'10px'}}>  OR </div>

              <div className="form-group">
               <input name="businessName" onChange={this.handleChange} value={this.state.businessName} placeholder="Please Enter Your Bussiness Name" type="text" className="form-control" />
              </div>

              <div style={{textAlign: 'center',}}>
                <input type="submit" className="btn btn-primary" value="submit" />
              </div>
            </form>
          </div>
        </Grid>
        
        { this.props.isResultNull ?
            this.showErrorMsg()
            
            :

            <div className="col-md-12" style={{marginTop:"10px"}}>
              <Grid>
                <Row>
                  
                  <Panel header={"Basic Detail"}>
                    <BootstrapTable data={basicDetail}>
                      <TableHeaderColumn width="150" dataField="businessId" isKey>businessId</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="name">name</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >registrationDate</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="companyForm" >companyForm</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="detailsUri" >detailsUri</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                  <Panel header={"Liquidations Detail"}> 
                    <BootstrapTable data={liquidationsDetail}>
                      <TableHeaderColumn width="150" dataField="version" isKey>Version</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="description">Description</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="type" >Type</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="language" >Language</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                  <Panel header={"Names Detail"}> 
                    <BootstrapTable data={namesDetail}>
                      <TableHeaderColumn width="150" dataField="order" isKey>Order</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="version">Version</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="name">Name</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                  <Panel header={"Auxiliary Names Detail"}> 
                    <BootstrapTable data={auxiliaryNamesDetail}>
                      <TableHeaderColumn width="150" dataField="order" isKey>Order</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="version">Version</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="name">Name</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                  <Panel header={"Addresses Detail"}> 
                    <BootstrapTable data={addressesDetail}>
                      <TableHeaderColumn width="150" dataField="careOf" isKey>CareOf</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="street">Street</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="postCode">PostCode</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="type">Type</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="version">Version</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="city">City</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="country">Country</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="language" >Language</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                  <Panel header={"CompanyForms Detail"}> 
                    <BootstrapTable data={companyFormsDetail}>
                      <TableHeaderColumn width="150" dataField="version" isKey>Version</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="name">Name</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="type">Type</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="language" >Language</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                  <Panel header={"Business Lines Detail"}> 
                    <BootstrapTable data={businessLinesDetail}>
                      <TableHeaderColumn width="150" dataField="version" isKey>Version</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="name">Name</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="type">Type</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="language" >Language</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                  <Panel header={"Languages Detail"}>
                    <BootstrapTable data={languagesDetail}>
                      <TableHeaderColumn width="150" dataField="version" isKey>Version</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="name">Name</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="type">Type</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="language" >Language</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                  <Panel header={"Registed Offices Detail"}>
                    <BootstrapTable data={registedOfficesDetail}>
                      <TableHeaderColumn width="150" dataField="order" isKey>Order</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="version">Version</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="name">Name</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="language" >Language</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                  <Panel header={"Registered Entries Detail"}>
                    <BootstrapTable data={registeredEntriesDetail}>
                      <TableHeaderColumn width="150" dataField="authority" isKey>Authority</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="register">Register</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="status">Status</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="language" >Language</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="description" >Description</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="statusDate" >StatusDate</TableHeaderColumn>

                    </BootstrapTable>
                  </Panel>

                  <Panel header={"BusinessId Changes Detail"}>
                    <BootstrapTable data={businessIdChangesDetail}>
                      <TableHeaderColumn width="150" dataField="version" isKey>Version</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="name">Name</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="type">Type</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="language" >Language</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                  <Panel header={"Contact Detail"}>
                    <BootstrapTable data={contactDetailsDetail}>
                      <TableHeaderColumn width="150" dataField="version" isKey>Version</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="value">Value</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="type">Type</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="registrationDate" >Registration Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="endDate" >End Date</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="language" >Language</TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="source" >Source</TableHeaderColumn>
                    </BootstrapTable>
                  </Panel>

                </Row>
              </Grid>
            </div>
        }
        
      </div>
    );
  }
}
