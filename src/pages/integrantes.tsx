export default function Integrantes() {
  const membros = [
    {
      nome: "Ana Carolina Pereira Fontes",
      turma: "1TDSPV",
      rm: "562145",
      foto: "src/assets/Carolina_ft.jpg",
    },
    {
      nome: "Daniel Nicolas Leoterio",
      turma: "1TDSPV",
      rm: "562186",
      foto: "src/assets/Daniel_ft.jpg",
    },
    {
      nome: "Matheus Moya de Oliveira",
      turma: "1TDSPV",
      rm: "562822",
      foto: "src/assets/Matheus_ft.jpg",
    },
  ];

  return (
    <section className="container mx-auto text-center">
      <h1 className="text-3xl font-bold my-6">Integrantes</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {membros.map((membro, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={membro.foto}
              alt={`Foto de ${membro.nome}`}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h2 className="text-lg font-semibold">{membro.nome}</h2>
            <p>Turma: {membro.turma}</p>
            <p>RM: {membro.rm}</p>
          </div>
        ))}
      </div>
    </section>
  );
}