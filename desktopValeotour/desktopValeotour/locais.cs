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
    internal class locais : conexao
    {
        //pontos_turisticos
        int id_ponto_turistico;

        //verificacoes_pontos_turisticos
        int id_verificacao;
        string status_verificacao_pt;
        string nome_v;
        string descricao_v;
        string tipo_v;
        string rua_v;
        string email_v;
        string bairro_v;
        string numero_v;
        string cidade_v;
        string latitude_v;
        string longitude_v;
        string foto_principal_v;
        string telefone_v;
        string comentario_v;
        string eixo_v;
        string dificuldade_v;
        string distancia_v;
        string tempo_v;
        string horario_v;
        string fotos_secundarias_v;

        public void setId_ponto_turistico(int id_ponto_turistico)
        {
            this.id_ponto_turistico = id_ponto_turistico;
        }
        public int getId_ponto_turistico()
        {
            return this.id_ponto_turistico;
        }


        //verificacoes_pontos_turisticos
        public void setId_verificacao(int id_verificacao)
        {
            this.id_verificacao = id_verificacao;
        }
        public int getId_verificacao()
        {
            return this.id_verificacao;
        }

        public void setStatus_verificacao_pt(string status_verificacao_pt)
        {
            this.status_verificacao_pt = status_verificacao_pt;
        }
        public string getStatus_verificacao_pt()
        {
            return this.status_verificacao_pt;
        }

        public void setNome_v(string nome_v)
        {
            this.nome_v = nome_v;
        }
        public string getNome_v()
        {
            return this.nome_v;
        }

        public void setDescricao_v(string descricao_v)
        {
            this.descricao_v = descricao_v;
        }
        public string getDescricao_v()
        {
            return this.descricao_v;
        }

        public void setTipo_v(string tipo_v)
        {
            this.tipo_v = tipo_v;
        }
        public string getTipo_v()
        {
            return this.tipo_v;
        }

        public void setRua_v(string rua_v)
        {
            this.rua_v = rua_v;
        }
        public string getRua_v()
        {
            return this.rua_v;
        }

        public void setEmail_v(string email_v)
        {
            this.email_v = email_v;
        }
        public string getEmail_v()
        {
            return this.email_v;
        }

        public void setBairro_v(string bairro_v)
        {
            this.bairro_v = bairro_v;
        }
        public string getBairro_v()
        {
            return this.bairro_v;
        }

        public void setNumero_v(string numero_v)
        {
            this.numero_v = numero_v;
        }
        public string getNumero_v()
        {
            return this.numero_v;
        }

        public void setCidade_v(string cidade_v)
        {
            this.cidade_v = cidade_v;
        }
        public string getCidade_v()
        {
            return this.cidade_v;
        }

        public void setLatitude_v(string latitude_v)
        {
            this.latitude_v = latitude_v;
        }
        public string getLatitude_v()
        {
            return this.latitude_v;
        }

        public void setLongitude_v(string longitude_v)
        {
            this.longitude_v = longitude_v;
        }
        public string getLongitude_v()
        {
            return this.longitude_v;
        }

        public void setFoto_principal_v(string foto_principal_v)
        {
            this.foto_principal_v = foto_principal_v;
        }
        public string getFoto_principal_v()
        {
            return this.foto_principal_v;
        }

        public void setTelefone_v(string telefone_v)
        {
            this.telefone_v = telefone_v;
        }
        public string getTelefone_v()
        {
            return this.telefone_v;
        }

        public void setComentario_v(string comentario_v)
        {
            this.comentario_v = comentario_v;
        }
        public string getComentario_v()
        {
            return this.comentario_v;
        }

        public void setEixo_v(string eixo_v)
        {
            this.eixo_v = eixo_v;
        }
        public string getEixo_v()
        {
            return this.eixo_v;
        }

        public void setDificuldade_v(string dificuldade_v)
        {
            this.dificuldade_v = dificuldade_v;
        }
        public string getDificuldade_v()
        {
            return this.dificuldade_v;
        }

        public void setDistancia_v(string distancia_v)
        {
            this.distancia_v = distancia_v;
        }
        public string getDistancia_v()
        {
            return this.distancia_v;
        }

        public void setTempo_v(string tempo_v)
        {
            this.tempo_v = tempo_v;
        }
        public string getTempo_v()
        {
            return this.tempo_v;
        }

        public void setHorario_v(string horario_v)
        {
            this.horario_v = horario_v;
        }
        public string getHorario_v()
        {
            return this.horario_v;
        }

        public void setFotos_secundarias_v(string fotos_secundarias_v)
        {
            this.fotos_secundarias_v = fotos_secundarias_v;
        }
        public string getFotos_secundarias_v()
        {
            return this.fotos_secundarias_v;
        }

        public DataTable consultar_locais()
        {
            this.abrirconexao();

            string mSQL = "SELECT pt.*, v.status_verificacao_pt FROM pontos_turisticos pt INNER JOIN verificacoes_pontos_turisticos v ON pt.id_ponto_turistico = v.id_ponto_turistico WHERE v.status_verificacao_pt = 'Aguardando verificação';";

            MySqlCommand cmd = new MySqlCommand(mSQL, conectar);

            MySqlDataAdapter da = new MySqlDataAdapter(cmd);

            this.fecharconexao();

            DataTable dt = new DataTable();
            da.Fill(dt);
            return dt;
        }

        public DataTable consultar_locaisVerificacoesPontosTuristicos()
        {
            this.abrirconexao();

            string mSQL = "SELECT pt.*, v.status_verificacao_pt FROM pontos_turisticos pt INNER JOIN verificacoes_pontos_turisticos v ON pt.id_ponto_turistico = v.id_ponto_turistico WHERE v.id_ponto_turistico = '" + getId_ponto_turistico() + "'";

            MySqlCommand cmd = new MySqlCommand(mSQL, conectar);

            MySqlDataAdapter da = new MySqlDataAdapter(cmd);

            this.fecharconexao();

            DataTable dt = new DataTable();
            da.Fill(dt);
            return dt;
        }

        public DataTable consultar_locaisHorarioFuncionamento()
        {
            this.abrirconexao();

            string mSQL = "SELECT pt.*, h.*, v.status_verificacao_pt FROM pontos_turisticos pt INNER JOIN horario_funcionamento h ON pt.id_ponto_turistico = h.id_ponto_turistico INNER JOIN verificacoes_pontos_turisticos v ON pt.id_ponto_turistico = v.id_ponto_turistico WHERE h.id_ponto_turistico = '" + getId_ponto_turistico() + "'";

            MySqlCommand cmd = new MySqlCommand(mSQL, conectar);

            MySqlDataAdapter da = new MySqlDataAdapter(cmd);

            this.fecharconexao();

            DataTable dt = new DataTable();
            da.Fill(dt);
            return dt;
        }

        public DataTable consultar_locaisTrilhas()
        {
            this.abrirconexao();

            string mSQL = "SELECT pt.*, t.*, v.status_verificacao_pt FROM pontos_turisticos pt INNER JOIN trilhas t ON pt.id_ponto_turistico = t.id_ponto_turistico INNER JOIN verificacoes_pontos_turisticos v ON pt.id_ponto_turistico = v.id_ponto_turistico WHERE t.id_ponto_turistico = '" + getId_ponto_turistico() + "'";

            MySqlCommand cmd = new MySqlCommand(mSQL, conectar);

            MySqlDataAdapter da = new MySqlDataAdapter(cmd);

            this.fecharconexao();

            DataTable dt = new DataTable();
            da.Fill(dt);
            return dt;
        }

        public void verificar_locais()
        {
            string query = "UPDATE verificacoes_pontos_turisticos SET status_verificacao_pt = '" + getStatus_verificacao_pt() + "', nome_v = '" + getNome_v() + "', descricao_v = '" + getDescricao_v() + "', tipo_v = '" + getTipo_v() + "', rua = '" + getRua_v() + "', email_v = '" + getEmail_v() + "', bairro_v = '" + getBairro_v() + "', numero_v = '" + getNumero_v() + "', cidade_v = '" + getCidade_v() + "', latitude_v = '" + getLatitude_v() + "', longitude_v = '" + getLongitude_v() + "', foto_principal_v = '" + getFoto_principal_v() + "', telefone_v = '" + getTelefone_v() + "', comentario_v = '" + getComentario_v() + "', eixo_v = '" + getEixo_v() +
                "' WHERE id_ponto_turistico = '" + getId_ponto_turistico() + "'";

            if (this.abrirconexao() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, conectar);
                cmd.ExecuteNonQuery();
                this.fecharconexao();
            }
        }
    }
}
