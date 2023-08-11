const constantes = require("../library/constantes");
const db = require("../library/dbConnection");

// Objeto para armazenar informações da sessão
const sessoes = {};

async function criarOuRecuperarSessao(codigoSessao) {
  if (!sessoes[codigoSessao]) {
    try {
      const query =
        "SELECT ses_user, ses_id FROM " +
        constantes.TABLE_LOGINS +
        " WHERE ses_key = ?";
      // faz o select das sessões 
      const [results] = await db.promise().query(query, [codigoSessao]);
      if (results.length > 0) {
        const { ses_user } = results[0];

        try {
          const queryUser =
            "SELECT usr_id, usr_email, usr_user, usr_role FROM " +
            constantes.TABLE_USERS +
            " WHERE usr_id = ?";
            // faz o select do user da sessao
          const [resultsUser] = await db.promise().query(queryUser, [ses_user]);

          if (resultsUser.length > 0) {
            const { usr_id, usr_email, usr_role, usr_user } = resultsUser[0];
            var role = "";
            switch (usr_role) {
              case 1:
                role = "Member";
                break;
              case 1:
                role = "Admin";
                break;
              default:
                role = "Member";
                break;
            }

            // carrega os dados do usuario na sessao
            sessoes[codigoSessao] = {
              session: codigoSessao,
              user: {
                id: usr_id,
                email: usr_email,
                username: usr_user,
                roleId: usr_role,
                role,
              },
            };
            // console.log(
            //   "Session data fetched:",
            //   JSON.stringify(sessoes[codigoSessao])
            // );
          } else {
            console.log("Não encontrou o usuário na sessão");
            return {
              error: true,
              message: "Usuário com dados incompletos",
            };
          }
        } catch (error) {
          console.error("Error fetching session data:", error);
          sessoes[codigoSessao] = {
            data: {
              userId: null,
              sessionId: null,
            },
          };
        }
        // fim select user
      } else {
        sessoes[codigoSessao] = {
          data: {
            userId: null,
            sessionId: null,
          },
        };
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
      sessoes[codigoSessao] = {
        data: {
          userId: null,
          sessionId: null,
        },
      };
    }
  }

  // console.log(sessoes[codigoSessao]);
  // console.log(sessoes[codigoSessao].user);
  return sessoes[codigoSessao].user;
}

module.exports = {
  criarOuRecuperarSessao,
};
