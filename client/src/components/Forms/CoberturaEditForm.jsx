import React, { Component, Fragment } from 'react';
import {noSave, Cobertura} from '../../redux/actions/tools';
import {connect} from 'react-redux';
import CoberturaModal from '../Modal/CoberturaModal';

class CoberturaEditForm extends Component {

    state={
        info: '',
        coverage: [],
        operaciones_cobertura: ''
    }

    getEquipoData = data =>{

        let eqp ={
            idequipo: data.id,
            equipo: data.equipo,
            consecutivo: data.consecutivo,
            usuario: data.usuario
        }

        this.setState(state=>{
            const coverage = state.coverage.concat(eqp);
            return{
                coverage
            }
        })

        this.setState({operaciones_cobertura: 'add'})
    }

    delete = i =>{
        this.setState(state => {
            const coverage = state.coverage.filter((elemento, j) => elemento.idequipo !== parseInt(i));
            return {
                coverage,
            };
        });    
        this.setState({operaciones_cobertura: 'delete'})
    }
    
    componentDidUpdate(prevProps){
        const {coverage, rows} = this.props;
        
        let info = rows.find(item => item.idregws === parseInt(this.props.idregws))

        if(coverage !== prevProps.coverage){
            this.setState({coverage, info})
        }

        const actualcobertura = this.state.coverage.slice();
        const {operaciones_cobertura} = this.state
        
        if(operaciones_cobertura === 'add'){
            for (let index = 0; index < actualcobertura.length; index++) {
                document.getElementsByName('delete')[index].disabled=true;
            }
        }
        if(operaciones_cobertura === 'delete'){
            
            document.getElementsByName('add')[0].disabled=true;
        }
        if(operaciones_cobertura === ''){
            for (let index = 0; index < actualcobertura.length; index++) {
                document.getElementsByName('delete')[index].disabled=false;
            }
            document.getElementsByName('add')[0].disabled=false;
        }

    }


    guardar = () =>{
        let {idregws} = this.props;
        let {operaciones_cobertura, info} = this.state;
        let previousC = this.props.coverage;
        let currentC = this.state.coverage;
        let flag=false;
        let count=0;
        let IDS = '-';

        if(operaciones_cobertura === 'add'){


            for (let index = 0; index < currentC.length; index++) {
                
                flag = previousC.find(item => item.idequipo === currentC[index].idequipo)
                if(!flag){
                    IDS = IDS + currentC[index].idequipo + `-`;
                    count = count+1;
                }
                
            }

            IDS  = IDS.substring(1, IDS.length);

            let data={
                idregin: info.idregin,
                idregws,
                IDS,
                size: count,
                opt: `'` + 'ADD' + `'`
            }

            this.props.Cobertura(data);
            this.setState({operaciones_cobertura: ''})

        }
        if(operaciones_cobertura === 'delete'){

            for (let index = 0; index < previousC.length; index++) {
                
                flag = currentC.find(item => item.idequipo === previousC[index].idequipo)
                if(!flag){
                    IDS = IDS + previousC[index].idequipo + `-`;
                    count = count+1;
                }
                
            }

            IDS  = IDS.substring(1, IDS.length);

            let data={
                idregin: info.idregin,
                idregws,
                IDS,
                size: count,
                opt: `'` + 'DEL' + `'`
            }

            this.props.Cobertura(data);
            this.setState({operaciones_cobertura: ''})

        }
        if(operaciones_cobertura === ''){
            this.props.noSave({msg:'No se ha notificado al sistema de cambios en la lista de cobertura', type:'info'})
        }

    }

    render() {

        const {coverage} = this.state;

        let coberturaLista = coverage.map((item, i)=>(
            <tr key={i}>
                <td> {item.idequipo}</td>
                <td>{item.equipo}</td>
                <td>{item.consecutivo}</td>
                <td>{item.usuario}</td>
                <td>
                    <button 
                        className="btn btn-sm btn-danger mx-2" 
                        name="delete"
                        onClick={()=>this.delete(item.idequipo)}>
                            DELETE
                    </button>
                </td>
            </tr>
        ))

        return (
        <Fragment>
            <div className="form-row mt-5">
                <div className="col-md-3 mb-3">
                    <label htmlFor="cobertura" className="font-weight-bold h5" style={{color: '#686fe9'}}>Cobertura:</label>
                </div>
                
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Equipo</th>
                            <th scope="col">Consecutivo</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coberturaLista}
                    </tbody>
                </table>  

            </div>

            <div className="form-row">
                <button
                    id="add" name="add"
                    className="btn btn-outline-dark btn-sm mx-2"
                    data-toggle="modal"
                    data-target="#coberturaModal"
                    >Agregar
                </button>
                <button className="btn btn-outline-primary btn-sm" onClick={this.guardar}>Guardar</button>
            </div>
            <CoberturaModal getComponentData={this.getEquipoData}/>
        </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    coverage: state.workshop.coverage,
    rows: state.workshop.tasks.data.rows
})

export default connect(mapStateToProps,{noSave, Cobertura})(CoberturaEditForm);