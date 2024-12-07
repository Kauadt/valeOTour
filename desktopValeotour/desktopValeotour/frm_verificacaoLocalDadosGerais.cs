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
    public partial class frm_verificacaoLocalDadosGerais : Form
    {
        public frm_verificacaoLocalDadosGerais()
        {
            InitializeComponent();
        }

        locais l = new locais();

        private int _id;
        private bool _acesso;

        public frm_verificacaoLocalDadosGerais(int id, bool acesso)
        {
            InitializeComponent();
            _id = id;
            _acesso = acesso;
        }

        private void frm_verificacaoLocalDadosGerais_Load(object sender, EventArgs e)
        {
            dataGridViewDadosGeraisVerificacaoLocal.DataSource = l.consultar_locais();

            dataGridViewDadosGeraisVerificacaoLocal.Columns["id_ponto_turistico"].HeaderText = "ID";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["nome_pt"].HeaderText = "Nome";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["descricao_pt"].HeaderText = "Descrição";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["tipo_pt"].HeaderText = "Tipo";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["rua_pt"].HeaderText = "Rua";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["email_pt"].HeaderText = "E-mail";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["senha_pt"].HeaderText = "Senha";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["bairro_pt"].HeaderText = "Bairro";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["numero_pt"].HeaderText = "Número";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["cidade_pt"].HeaderText = "Cidade";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["latitude_pt"].HeaderText = "Latitude";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["longitude_pt"].HeaderText = "Loongitude";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["foto_principal_pt"].HeaderText = "Foto Pricipal";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["telefone_pt"].HeaderText = "Telefone";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["eixo_pt"].HeaderText = "Eixo";
            dataGridViewDadosGeraisVerificacaoLocal.Columns["status_verificacao_pt"].HeaderText = "Status da Verificação";

            if (_acesso == true)
            {
                exibiregistro(dataGridViewDadosGeraisVerificacaoLocal.CurrentRow.Index);

                MySqlConnection conn = null;
                string strConn = @"Server=localhost;Database=valeotour;Uid=root;Pwd='';Connect Timeout=30;";
                conn = new MySqlConnection(strConn);
                conn.Open();
                string mSQL = "select * from pontos_turisticos where id_ponto_turistico = '" + int.Parse(txt_idDadosGeraisVerificacaoLocal.Text) + "'";
                MySqlCommand cmd = new MySqlCommand(mSQL, conn);
                MySqlDataAdapter da = new MySqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                string image = dt.Rows[0]["foto_principal_pt"].ToString();
                pic_imagemPerfil.ImageLocation = "C:/xampp/htdocs/valeOTour/pontos_turisticos/assets/" + image;
                pic_imagemPerfil.SizeMode = PictureBoxSizeMode.Zoom;
            }
        }

        private void btn_sairDadosGeraisVerificacaoLocal_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja sair ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                Application.Exit();
            }
        }

        public void exibiregistro(int i)
        {
            txt_idDadosGeraisVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[0, i].Value;
            txt_nomeDadosGeraisVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[1, i].Value;
            txt_nomePanelVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[1, i].Value;
            txt__tipoDadosGeraisVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[3, i].Value;
            txt_ruaDadosGeraisVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[4, i].Value;
            txt_emailDadosGeraisVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[5, i].Value;
            txt_emailPanelVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[5, i].Value;
            txt_bairroDadosGeraisVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[7, i].Value;
            txt_numeroDadosGeraisVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[8, i].Value;
            txt_cidadeDadosGeraisVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[9, i].Value;
            txt_telefoneDadosGeraisVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[13, i].Value;
            txt_eixoDadosGeraisVerificacaoLocal.Text = "" + dataGridViewDadosGeraisVerificacaoLocal[14, i].Value;
        }

        private void dataGridViewDadosGeraisVerificacaoLocal_Click(object sender, EventArgs e)
        {
            exibiregistro(dataGridViewDadosGeraisVerificacaoLocal.CurrentRow.Index);

            MySqlConnection conn = null;
            string strConn = @"Server=localhost;Database=valeotour;Uid=root;Pwd='';Connect Timeout=30;";
            conn = new MySqlConnection(strConn);
            conn.Open();
            string mSQL = "select * from pontos_turisticos where id_ponto_turistico = '" + int.Parse(txt_idDadosGeraisVerificacaoLocal.Text) + "'";
            MySqlCommand cmd = new MySqlCommand(mSQL, conn);
            MySqlDataAdapter da = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            string image = dt.Rows[0]["foto_principal_pt"].ToString();
            pic_imagemPerfil.ImageLocation = "C:/xampp/htdocs/valeOTour/pontos_turisticos/assets/" + image;
            pic_imagemPerfil.SizeMode = PictureBoxSizeMode.Zoom;
        }

        private void btn_voltarPanelVerificacaoLocal_Click(object sender, EventArgs e)
        {
            frm_principal form = new frm_principal();
            form.Show();
            this.Hide();
        }

        private void btn_continuarVerificacaoLocal_Click(object sender, EventArgs e)
        {
            int id = int.Parse(txt_idDadosGeraisVerificacaoLocal.Text);
            string nome = txt_nomePanelVerificacaoLocal.Text;
            string email = txt_emailPanelVerificacaoLocal.Text;
            frm_verificacaoLocalAdicionais form = new frm_verificacaoLocalAdicionais(id, nome, email);
            form.Show();
            this.Hide();
        }
    }
}
