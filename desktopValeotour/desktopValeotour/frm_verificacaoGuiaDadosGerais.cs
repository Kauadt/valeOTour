using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace desktopValeotour
{
    public partial class frm_verificacaoGuiaDadosGerais : Form
    {
        public frm_verificacaoGuiaDadosGerais()
        {
            InitializeComponent();
        }

        guias g = new guias();

        private bool _acesso;
        private int _id;

        public frm_verificacaoGuiaDadosGerais(bool acesso, int id)
        {
            InitializeComponent();
            _acesso = acesso;
            _id = id;
        }

        private void frm_verificacaoGuia_Load(object sender, EventArgs e)
        {
            dataGridViewDadosGeraisVerificacaoGuia.DataSource = g.consultar_guias();

            dataGridViewDadosGeraisVerificacaoGuia.Columns["id_guia"].HeaderText = "ID";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["cadastur_frente"].HeaderText = "Cadastur Frente";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["cadastur_verso"].HeaderText = "Cadastur Verso";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["cadastur_guia"].HeaderText = "Cadastur";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["id_usuario"].HeaderText = "ID Usuário";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["cidade_guia"].HeaderText = "Cidade";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["eixo_guia"].HeaderText = "Eixo";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["biografia_guia"].HeaderText = "Biografia";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["cpf_guia"].HeaderText = "CPF";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["taxa_hora_guia"].HeaderText = "Taxa por Hora";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["taxa_pessoa_guia"].HeaderText = "Taxa por Pessoa";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["email_usuario"].HeaderText = "E-mail";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["nome_usuario"].HeaderText = "Nome";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["caminho_imagem_usuario"].HeaderText = "Imagem";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["tipo_usuario"].HeaderText = "Tipo";
            dataGridViewDadosGeraisVerificacaoGuia.Columns["status_verificacao"].HeaderText = "Status da Verificação";

            if (_acesso == true)
            {
                exibiregistro(dataGridViewDadosGeraisVerificacaoGuia.CurrentRow.Index);

                MySqlConnection conn = null;
                string strConn = @"Server=localhost;Database=valeotour;Uid=root;Pwd='';Connect Timeout=30;";
                conn = new MySqlConnection(strConn);
                conn.Open();
                string mSQL = "select * from usuarios where id_usuario = '" + int.Parse(txt_idUsuarioDadosGeraisVerificacaoGuia.Text) + "'";
                MySqlCommand cmd = new MySqlCommand(mSQL, conn);
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                string image = dt.Rows[0]["caminho_imagem_usuario"].ToString();
                pic_imagemPerfil.ImageLocation = "C:/xampp/htdocs/valeOTour/usuarios/assets/" + image;
                pic_imagemPerfil.SizeMode = PictureBoxSizeMode.Zoom;
            }
        }

        public void exibiregistro(int i)
        {
            txt_idDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[0, i].Value;
            txt_cadasturDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[3, i].Value;
            txt_cadasturPanelVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[3, i].Value;
            txt_idUsuarioDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[4, i].Value;
            txt_cidadeAtuacaoDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[5, i].Value;
            txt_eixoTuristicoDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[6, i].Value;
            txt_biografiaDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[7, i].Value;
            txt_cpfDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[8, i].Value;
            txt_taxaHoraDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[9, i].Value;
            txt_taxaPessoaDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[10, i].Value;
            txt_emailDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[11, i].Value;
            txt_emailPanelVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[11, i].Value;
            txt_nomeDadosGeraisVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[12, i].Value;
            txt_nomePanelVerificacaoGuia.Text = "" + dataGridViewDadosGeraisVerificacaoGuia[12, i].Value;
        }

        private void btn_voltarPanelVerificacaoGuia_Click(object sender, EventArgs e)
        {
            frm_principal form = new frm_principal();
            form.Show();
            this.Hide();
        }

        private void btn_verificarVerificacaoGuia_Click(object sender, EventArgs e)
        {
            int id = int.Parse(txt_idDadosGeraisVerificacaoGuia.Text);
            int idUsuario = int.Parse(txt_idUsuarioDadosGeraisVerificacaoGuia.Text);
            string nome = txt_nomePanelVerificacaoGuia.Text;
            string email = txt_emailPanelVerificacaoGuia.Text;
            int cadastur = int.Parse(txt_cadasturPanelVerificacaoGuia.Text);
            frm_verificacaoGuiaFotos form = new frm_verificacaoGuiaFotos(id, idUsuario, nome, email, cadastur);
            form.Show();
            this.Hide();
        }

        private void dataGridViewDadosGeraisVerificacaoGuia_Click_1(object sender, EventArgs e)
        {
            exibiregistro(dataGridViewDadosGeraisVerificacaoGuia.CurrentRow.Index);

            MySqlConnection conn = null;
            string strConn = @"Server=localhost;Database=valeotour;Uid=root;Pwd='';Connect Timeout=30;";
            conn = new MySqlConnection(strConn);
            conn.Open();
            string mSQL = "select * from usuarios where id_usuario = '" + int.Parse(txt_idUsuarioDadosGeraisVerificacaoGuia.Text) + "'";
            MySqlCommand cmd = new MySqlCommand(mSQL, conn);
            MySqlDataAdapter da = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            string image = dt.Rows[0]["caminho_imagem_usuario"].ToString();
            pic_imagemPerfil.ImageLocation = "C:/xampp/htdocs/valeOTour/usuarios/assets/" + image;
            pic_imagemPerfil.SizeMode = PictureBoxSizeMode.Zoom;

        }

        private void btn_sairPrincipal_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja sair ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                Application.Exit();
            }
        }
    }
}
