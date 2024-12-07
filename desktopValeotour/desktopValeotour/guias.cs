using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace desktopValeotour
{
    class guias : conexao
    {
        //guias
        int id_guia;
        string cadastur_frente;
        string cadastur_verso;
        int cadastur_guia;
        int id_usuario;
        string cidade_guia;
        string eixo_guia;
        string biografia_guia;
        string cpf_guia;
        float taxa_hora_guia;
        float taxa_pessoa_guia;

        //usuarios
        string email_usuario;
        string nome_usuario;
        string caminho_imagem_usuario;
        string tipo_usuario;
        string senha_usuario;

        //verificacoes_guias
        int id_verificacao;
        string cidade_v;
        string nome_v;
        string status_verificacao;
        string comentario_v;
        string cadastur_frente_v;
        string cadastur_verso_v;
        string cadastur_v;
        string eixo_v;
        string biografia_v;
        string cpf_v;
        string taxa_hora_v;
        string taxa_pessoa_v;
        string imagePath_v;
        string email_v;
        string data_v;

        //guias
        public void setId_guia(int id_guia)
        {
            this.id_guia = id_guia;
        }
        public int getId_guia()
        {
            return this.id_guia;
        }

        public void setId_usuario(int id_usuario)
        {
            this.id_usuario = id_usuario;
        }
        public int getId_usuario()
        {
            return this.id_usuario;
        }

        //usuarios
        public void setTipo_usuario(string tipo_usuario)
        {
            this.tipo_usuario = tipo_usuario;
        }
        public string getTipo_usuario()
        {
            return this.tipo_usuario;
        }

        //verificacoes_guias
        public void setId_verificacao(int id_verificacao)
        {
            this.id_verificacao = id_verificacao;
        }
        public int getId_verificacao()
        {
            return this.id_verificacao;
        }

        public void setCidade_v(string cidade_v)
        {
            this.cidade_v = cidade_v;
        }
        public string getCidade_v()
        {
            return this.cidade_v;
        }

        public void setNome_v(string nome_v)
        {
            this.nome_v = nome_v;
        }
        public string getNome_v()
        {
            return this.nome_v;
        }

        public void setStatus_verificacao(string status_verificacao)
        {
            this.status_verificacao = status_verificacao;
        }
        public string getStatus_verificacao()
        {
            return this.status_verificacao;
        }

        public void setComentario_v(string comentario_v)
        {
            this.comentario_v = comentario_v;
        }
        public string getComentario_v()
        {
            return this.comentario_v;
        }

        public void setCadastur_frente_v(string cadastur_frente_v)
        {
            this.cadastur_frente_v = cadastur_frente_v;
        }
        public string getCadastur_frente_v()
        {
            return this.cadastur_frente_v;
        }

        public void setCadastur_verso_v(string cadastur_verso_v)
        {
            this.cadastur_verso_v = cadastur_verso_v;
        }
        public string getCadastur_verso_v()
        {
            return this.cadastur_verso_v;
        }

        public void setCadastur_v(string cadastur_v)
        {
            this.cadastur_v = cadastur_v;
        }
        public string getCadastur_v()
        {
            return this.cadastur_v;
        }

        public void setEixo_v(string eixo_v)
        {
            this.eixo_v = eixo_v;
        }
        public string getEixo_v()
        {
            return this.eixo_v;
        }

        public void setBiografia_v(string biografia_v)
        {
            this.biografia_v = biografia_v;
        }
        public string getBiografia_v()
        {
            return this.biografia_v;
        }

        public void setCpf_v(string cpf_v)
        {
            this.cpf_v = cpf_v;
        }
        public string getCpf_v()
        {
            return this.cpf_v;
        }

        public void setTaxa_hora_v(string taxa_hora_v)
        {
            this.taxa_hora_v = taxa_hora_v;
        }
        public string getTaxa_hora_v()
        {
            return this.taxa_hora_v;
        }

        public void setTaxa_pessoa_v(string taxa_pessoa_v)
        {
            this.taxa_pessoa_v = taxa_pessoa_v;
        }
        public string getTaxa_pessoa_v()
        {
            return this.taxa_pessoa_v;
        }

        public void setImagePath_v(string imagePath_v)
        {
            this.imagePath_v = imagePath_v;
        }
        public string getImagePath_v()
        {
            return this.imagePath_v;
        }

        public void setEmail_v(string email_v)
        {
            this.email_v = email_v;
        }
        public string getEmail_v()
        {
            return this.email_v;
        }

        public void setData_v(string data_v)
        {
            this.data_v = data_v;
        }
        public string getData_v()
        {
            return this.data_v;
        }


        public DataTable consultar_guias()
        {
            this.abrirconexao();

            string mSQL = "SELECT g.*, u.email_usuario, u.nome_usuario, u.caminho_imagem_usuario, u.tipo_usuario, vg.status_verificacao FROM guias g INNER JOIN verificacoes_guias vg ON g.id_guia = vg.id_guia INNER JOIN usuarios u ON g.id_usuario = u.id_usuario WHERE vg.status_verificacao = 'Aguardando verificação';";

            MySqlCommand cmd = new MySqlCommand(mSQL, conectar);

            MySqlDataAdapter da = new MySqlDataAdapter(cmd);

            this.fecharconexao();

            DataTable dt = new DataTable();
            da.Fill(dt);
            return dt;
        }

        public void verificar_guia()
        {
            string query = "UPDATE verificacoes_guias SET status_verificacao = '" + getStatus_verificacao() + "', cidade_v = '" + getCidade_v() + "', nome_v = '" + getNome_v() + "', comentario_v = '" + getComentario_v() + "', cadastur_frente_v = '" + getCadastur_frente_v() + "', cadastur_verso_v = '" + getCadastur_verso_v() + "', cadastur_v = '" + getCadastur_v() + "', eixo_v = '" + getEixo_v() + "', biografia_v = '" + getBiografia_v() + "', cpf_v = '" + getCpf_v() + "', taxa_hora_v = '" + getTaxa_hora_v() + "', taxa_pessoa_v = '" + getTaxa_pessoa_v() + "', imagePath_v = '" + getImagePath_v() + "', email_v = '" + getEmail_v() + "', data_v = '" + getData_v() +
                "' WHERE id_guia = '" + getId_guia() + "'";

            if (this.abrirconexao() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, conectar);
                cmd.ExecuteNonQuery();
                this.fecharconexao();
            }
        }
    }
}
