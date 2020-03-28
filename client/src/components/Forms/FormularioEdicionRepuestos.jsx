import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {noSave, Repuestos} from '../../redux/actions/tools';
import RepuestosModal from '../Modal/RepuestosModal';

class FormularioEdicionRepuestos extends Component {

    state={
        info: [],
        parts: [],
        operacion_rep: '',
    }

    getRepuestoData = data =>{
        let {parts} = this.state;
        let addrepuesto={
            idrepuesto: data.id,
            qty: data.qty,
            repuesto: data.repuesto,
            simbolo: '',
            costo: '',
            moneda: '',
            subtotal: ''

        }

        let existe = parts.filter(item => item.idrepuesto === parseInt(addrepuesto.idrepuesto))
        if(existe.length < 1){
            if(parts.length <= 4)
            {
                this.setState(prevState=>({
                    parts: [...prevState.parts, addrepuesto]
                }))

                this.setState({operacion_rep: 'add'})
            
            }else{
                this.props.noSave({msg: '`El N° de Repuestos para este equipo, ha llegado a su limite`', type: 'warning'});
            }
        }else{
            this.props.noSave({msg: `El repuesto: ${addrepuesto.repuesto}, ya fue agregado`, type: 'danger'});
        }
        
    }

    INC_QTY_REP = i => {
        this.setState(state => {
            const parts = state.parts.map((item) => {
            if (item.idrepuesto === i && item.qty < 4) {
                
                item.qty +=1
                return item;

            } else {
                this.props.noSave({msg:'Cantidad no permitida', type:'warning'})
              return item;
            }
          });
          return {
            parts,
          };
        });

        this.setState({operacion_rep: 'update'})
    }

    DEC_QTY_REP = i => {
        this.setState(state => {
            const parts = state.parts.map((item) => {
            if (item.idrepuesto === i && item.qty > 1) {
                
                item.qty -=1
                return item;

            } else {
                this.props.noSave({msg:'Cantidad no permitida', type:'warning'})
              return item;
            }
          });
          return {
            parts,
          };
        });

        this.setState({operacion_rep: 'update'})
    }

    deletePart = i =>{
        this.setState(state => {
            const parts = state.parts.filter((elemento, j) => elemento.idrepuesto !== parseInt(i));
            return {
                parts,
            };
        });    
        this.setState({operacion_rep: 'delete'})
    }

    
    updateRep = () =>{
        
        const {operacion_rep, info} = this.state;
        const currentP = this.state.parts.slice();
        const previousP = this.props.parts.slice();
        let idregin = info[0].idregws;
        let idregws = info[0].idregws;
        let flag = false;
        let count = 0;
        let IDS = '-';
        let VALUES = '-'

        if(operacion_rep === 'update'){

            let data = {
                currentP,
                idregws,
                opt: 'UPD'
            }

            this.props.Repuestos(data);
        }

        if(operacion_rep === 'add'){
            
            for (let index = 0; index < currentP.length; index++) {
                
                flag = previousP.find(item => item.idrepuesto === currentP[index].idrepuesto)
                if(!flag){
                    IDS = IDS + currentP[index].idrepuesto + `-`;
                    VALUES = VALUES + currentP[index].qty + `-`;
                    
                    count = count+1;
                }
            }

            IDS  = IDS.substring(1, IDS.length);
            VALUES  = VALUES.substring(1, VALUES.length);

            let data={
                idregws,
                IDS,
                VALUES,
                size: count,
                opt: 'ADD'
            }
            console.log(data)
            this.props.Repuestos(data);
            this.setState({operacion_rep: ''})
            
        }
        if(operacion_rep === 'delete'){

            for (let index = 0; index < previousP.length; index++) {
                
                flag = currentP.find(item => item.idrepuesto === previousP[index].idrepuesto)
                if(!flag){
                    IDS = IDS + previousP[index].idrepuesto + `-`;
                    count = count+1;
                }
            }

            IDS  = IDS.substring(1, IDS.length);
            let data={
                idregws,
                IDS,
                VALUES: '',
                size: count,
                opt: 'DEL'
            }

            console.log(data)
            this.props.Repuestos(data);
            this.setState({operacion_rep: ''})

        }
        if(operacion_rep === ''){
            this.props.noSave({msg:'No se ha notificado al sistema de cambios en los repuestos del equipo', type:'info'})
        }
    }

    componentDidMount(){
        let info = this.props.tasks
        this.setState({info})
    }

    componentDidUpdate(prevProps){
        const {parts} = this.props;
        
        if(parts !== prevProps.parts){
            this.setState({parts})
        }


        const repuestosactuales = this.state.parts.slice();
        const {operacion_rep} = this.state
        
        if(operacion_rep==='add'){
            for (let index = 0; index < repuestosactuales.length; index++) {
                document.getElementsByName('delrepuesto')[index].disabled=true;
                document.getElementsByName('increpuesto')[index].disabled=true;
                document.getElementsByName('decrepuesto')[index].disabled=true;
            }
        }
        if(operacion_rep==='delete'){
            for (let index = 0; index < repuestosactuales.length; index++) {
                
                document.getElementsByName('increpuesto')[index].disabled=true;
                document.getElementsByName('decrepuesto')[index].disabled=true;
            }
            document.getElementsByName('addrepuesto')[0].disabled=true;
        }
        if(operacion_rep==='update'){
            for (let index = 0; index < repuestosactuales.length; index++) {
                
                document.getElementsByName('delrepuesto')[index].disabled=true;
            }
            document.getElementsByName('addrepuesto')[0].disabled=true;
        }
        if(operacion_rep===''){
            for (let index = 0; index < repuestosactuales.length; index++) {
                document.getElementsByName('delrepuesto')[index].disabled=false;
                document.getElementsByName('increpuesto')[index].disabled=false;
                document.getElementsByName('decrepuesto')[index].disabled=false;
            }
            document.getElementsByName('addrepuesto')[0].disabled=false;
        }
    }

    render() {

        const {parts} = this.state;

        let repuestosList = parts.map((item, i)=>(
            <tr key={i}>
                <td>{item.idrepuesto}</td>
                <td>
                    {item.qty}
                </td>
                <td>{item.repuesto}</td>
                <td>
                    <button 
                        className="btn btn-sm btn-secondary mx-2 text-success font-weight-bold" 
                        name="increpuesto" 
                        onClick={()=>this.INC_QTY_REP(item.idrepuesto)}>
                            +1
                    </button>
                    <button 
                        className="btn btn-sm btn-secondary mx-2 text-danger font-weight-bold" 
                        name="decrepuesto"
                        onClick={()=>this.DEC_QTY_REP(item.idrepuesto)}>
                            -1
                    </button>
                    <button 
                        className="btn btn-sm btn-danger mx-2" 
                        name="delrepuesto"
                        onClick={()=>this.deletePart(item.idrepuesto)}>
                            D
                    </button>
                </td>
            </tr>
        ))


        return (
            <Fragment>
                <div className="form-row mt-5">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="repuesto" className="font-weight-bold h5" style={{color: '#686fe9'}}>Repuestos:</label>
                    </div>
                    
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Repuesto</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repuestosList}
                        </tbody>
                    </table>  

                </div>

                <div className="form-row">
                    <button
                        id="addrepuesto" name="addrepuesto"
                        className="btn btn-outline-dark btn-sm mx-2"
                        data-toggle="modal"
                        data-target="#repuestosModal"
                        >Agregar
                    </button>
                    <button className="btn btn-outline-primary btn-sm" onClick={this.updateRep}>Guardar</button>
                </div>
                <RepuestosModal getComponentData={this.getRepuestoData} idregws={this.props.idregws}/>
            </Fragment>
        );
    }
}

const mapStateToProps = state=>({
    parts: state.workshop.parts,
    tasks: state.workshop.tasks.data.rows,
})

export default connect(mapStateToProps,{noSave, Repuestos })(FormularioEdicionRepuestos);