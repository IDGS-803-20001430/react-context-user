import { useContext, useEffect } from "react";
import UserContext from "../Context/User/UserContext";
import Swal from "sweetalert2";

const UserList = () => {
    const { users, getUsers, getProfile, deleteUser } = useContext(UserContext);

    useEffect(() => {
        getUsers();
    }, []);

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar este usuario después de eliminarlo.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id);
                Swal.fire(
                    'Eliminado!',
                    'El usuario ha sido eliminado.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="list-group h-100">
            {
                users.map(user => (
                    <a
                        className="list-group-item list-group-item-action d-flex flex-row"
                        href="#"
                        key={user.id}
                        onClick={() => getProfile(user.id)}
                    >
                        <div className="row w-100">
                            <div className="col-auto">
                                <img src={user.avatar} className="img-fluid rounded-circle" width="70" alt="Avatar" />
                            </div>
                            <div className="col">
                                <p className="mb-0">{`${user.first_name} ${user.last_name}`}</p>
                            </div>
                            <div className="col-auto text-end">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita que el clic en el botón dispare el evento del enlace
                                        handleDeleteUser(user.id);
                                    }}
                                    className="btn btn-danger btn-sm"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </a>
                ))
            }
        </div>
    );
};

export default UserList;
