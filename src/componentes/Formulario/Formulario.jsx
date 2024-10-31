import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import UserContext from '../../Context/User/UserContext';
import Swal from 'sweetalert2';

const Formulario = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { postUser, putUser } = useContext(UserContext);

    const onSubmit = async (data) => {
        try {
            const response = await postUser(data);
            console.log(response);
            
            Swal.fire({
                title: '¡Éxito!',
                html: `
                    <div class="text-start">
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">ID:</span>
                            <input type="text" class="form-control" value="${response.id}" readonly>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Nombre:</span>
                            <input type="text" class="form-control" value="${response.name}" readonly>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Trabajo:</span>
                            <input type="text" class="form-control" value="${response.job}" readonly>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Fecha:</span>
                            <input type="text" class="form-control" value="${new Date(response.createdAt).toLocaleString()}" readonly>
                        </div>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            reset();
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No se pudo añadir el usuario.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const modificar = async (data) => {
        try {
            const response = await putUser(data);
            Swal.fire({
                title: '¡Éxito!',
                html: `
                    <div class="text-start">
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Nombre:</span>
                            <input type="text" class="form-control" value="${response.name}" readonly>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Trabajo:</span>
                            <input type="text" class="form-control" value="${response.job}" readonly>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Fecha:</span>
                            <input type="text" class="form-control" value="${new Date(response.updatedAt).toLocaleString()}" readonly>
                        </div>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No se pudo modificar el usuario.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    

    const handleModificar = handleSubmit(modificar);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Formulario</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row'>
            <div className="form-group col-6">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        placeholder="Ingrese su nombre"
                        {...register('name', { required: true })}
                    />
                    {errors.name && <div className="invalid-feedback">El campo nombre es requerido</div>}
                </div>
                <div className="form-group col-6">
                    <label htmlFor="job">Trabajo</label>
                    <input
                        type="text"
                        className={`form-control ${errors.job ? 'is-invalid' : ''}`}
                        id="job"
                        placeholder="Ingrese su trabajo"
                        {...register('job', { required: true })}
                    />
                    {errors.job && <div className="invalid-feedback">El campo trabajo es requerido</div>}
                </div>
            </div>
            <div className='row' style={{paddingBottom: '5%', paddingTop: '5%'}}>
                <div className='col-3'></div>
                <div className="col-3">
                    <button
                        type="submit"
                        className="btn btn-primary me-2"
                        style={{ width: '100%'}}
                    >
                        Añadir
                    </button>
                </div>
                
                <div className="col-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleModificar}
                        style={{ width: '100%'}}
                    >
                        Modificar
                    </button>
                </div>
                <div className='col-3'></div>
            </div>
            </form>
        </div>
    );
};

export default Formulario;
