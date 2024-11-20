import { useEffect, useState, useRef } from "react";
import lixeira from "../../assets/lixeira.png";
import api from "../../services/api";
import "./style.css";

function Home() {
  const [vaga, setVaga] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const inputnome = useRef();
  const inputdescricao = useRef();
  const inputrequisitos = useRef();
  const inputsalario = useRef();
  const inputlocalizacao = useRef();

  async function getvagas() {
    const vagaFromApi = await api.get("/vagas");
    setVaga(vagaFromApi.data);
  }

  async function createvagas() {
    await api.post("/vagas", {
      nome: inputnome.current.value,
      descricao: inputdescricao.current.value,
      requisitos: inputrequisitos.current.value,
      salario: inputsalario.current.value,
      localizacao: inputlocalizacao.current.value,
    });
    getvagas();
  }

  async function updatevagas() {
    if (editingId) {
      await api.put(`/vagas/${editingId}`, {
        nome: inputnome.current.value,
        descricao: inputdescricao.current.value,
        requisitos: inputrequisitos.current.value,
        salario: inputsalario.current.value,
        localizacao: inputlocalizacao.current.value,
      });
      setEditingId(null); // Reseta o estado de edição
      getvagas();
    }
  }

  async function deletevagas(id) {
    await api.delete(`/vagas/${id}`);
    getvagas();
  }

  const handleEditClick = (vaga) => {
    setEditingId(vaga.id);
    inputnome.current.value = vaga.nome;
    inputdescricao.current.value = vaga.descricao;
    inputrequisitos.current.value = vaga.requisitos;
    inputsalario.current.value = vaga.salario;
    inputlocalizacao.current.value = vaga.localizacao;
  };

  useEffect(() => {
    getvagas();
  }, []);

  return (
    <div className="container">
      <form action="" className="container">
        <h1>{editingId ? "Editar vaga" : "Cadastrar vaga"}</h1>
        <input type="text" name="nome" placeholder="nome" ref={inputnome} />
        <input
          type="text"
          name="descricao"
          placeholder="descricao"
          ref={inputdescricao}
        />
        <input
          type="text"
          name="requisitos"
          placeholder="requisitos"
          ref={inputrequisitos}
        />
        <input
          type="text"
          name="salario"
          placeholder="salario"
          ref={inputsalario}
        />
        <input
          type="text"
          name="localizacao"
          placeholder="localizacao"
          ref={inputlocalizacao}
        />
        <button type="button" onClick={editingId ? updatevagas : createvagas}>
          {editingId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      {vaga.map((vaga) => (
        <div key={vaga.id} className="vaga-container">
          <div className="vagas-view">
            <br />
            <p>nome: {vaga.nome}</p>
            <p>descricao: {vaga.descricao} </p>
            <p>requisitos: {vaga.requisitos} </p>
            <p>salario: {vaga.salario}</p>
            <p>localizacao: {vaga.localizacao}</p>
            <br />
          </div>
          <button onClick={() => handleEditClick(vaga)} style={{ marginRight: "10px" }}>
            Editar
          </button>
          <button onClick={() => deletevagas(vaga.id)} style={{ width: "50px", height: "60px" }}>
            <img src={lixeira} style={{ width: "50px", height: "50px" }} alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
