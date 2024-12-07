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
    public partial class frm_verificacaoGuiaFotos : Form
    {
        public frm_verificacaoGuiaFotos()
        {
            InitializeComponent();
        }

        guias g = new guias();

        private int _id;
        private int _idUsuario;
        private string _nome;
        private string _email;
        private int _cadastur;

        public frm_verificacaoGuiaFotos(int id, int idUsuario, string nome, string email, int cadastur)
        {
            InitializeComponent();
            _id = id;
            _idUsuario = idUsuario;
            _nome = nome;
            _email = email;
            _cadastur = cadastur;
        }

        private void btn_voltarPanelVerificacaoGuia_Click(object sender, EventArgs e)
        {
            int id = _id;
            bool acesso = true;
            frm_verificacaoGuiaDadosGerais form = new frm_verificacaoGuiaDadosGerais(acesso, id);
            form.Show();
            this.Hide();
        }

        public static string PegarDataAtualFormatada()
        {
            return DateTime.Now.ToString("yyyy:MM:dd");
        }

        public string verificacaoData = PegarDataAtualFormatada();

        private void btn_verificarVerificacaoGuia_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja verificar o guia ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                try
                {
                    g.setStatus_verificacao("Aprovado");
                    g.setCidade_v("Aprovado");
                    g.setNome_v("Aprovado");
                    g.setCadastur_frente_v("Aprovado");
                    g.setCadastur_verso_v("Aprovado");
                    g.setCadastur_v("Aprovado");
                    g.setEixo_v("Aprovado");
                    g.setBiografia_v("Aprovado");
                    g.setCpf_v("Aprovado");
                    g.setTaxa_hora_v("Aprovado");
                    g.setTaxa_pessoa_v("Aprovado");
                    g.setImagePath_v("Aprovado");
                    g.setEmail_v("Aprovado");
                    g.setId_guia(_id);
                    g.setData_v(verificacaoData);
                    g.verificar_guia();

                }
                finally
                {
                    MessageBox.Show("Verificação enviada com sucesso!");
                    frm_principal form = new frm_principal();
                    form.Show();
                    this.Hide();
                }
            }
        }

        private void btn_negarVerificacaoGuia_Click(object sender, EventArgs e)
        {
            int id = _id;
            int idUsuario = _idUsuario;
            string nome = _nome;
            string email = _email;
            int cadastur = _cadastur;
            frm_erroGuia form = new frm_erroGuia(id, idUsuario, nome, email, cadastur);
            form.Show();
            this.Hide();
        }

        private void frm_verificacaoGuiaFotos_Load(object sender, EventArgs e)
        {
            txt_nomePanelVerificacaoGuia.Text = _nome;
            txt_emailPanelVerificacaoGuia.Text = _email;
            txt_cadasturPanelVerificacaoGuia.Text = _cadastur.ToString();

            MySqlConnection conn = null;
            string strConn = @"Server=localhost;Database=valeotour;Uid=root;Pwd='';Connect Timeout=30;";
            conn = new MySqlConnection(strConn);
            conn.Open();

            string mSQL = "select * from usuarios where id_usuario = '" + _idUsuario + "'";
            MySqlCommand cmd = new MySqlCommand(mSQL, conn);
            MySqlDataAdapter da = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            string image = dt.Rows[0]["caminho_imagem_usuario"].ToString();
            pic_imagemPerfil.ImageLocation = "C:/xampp/htdocs/valeOTour/usuarios/assets/" + image;
            pic_imagemPerfil.SizeMode = PictureBoxSizeMode.Zoom;


            string _mSQL = "select * from guias where id_usuario = '" + _idUsuario + "'";
            MySqlCommand _cmd = new MySqlCommand(_mSQL, conn);
            MySqlDataAdapter _da = new MySqlDataAdapter(_cmd);
            DataTable _dt = new DataTable();
            _da.Fill(_dt);
            string cadasturFrente = _dt.Rows[0]["cadastur_frente"].ToString();
            pic_frenteFotoCadasturVerificacaoGuia.ImageLocation = "C:/xampp/htdocs/valeOTour/guias/assets/" + cadasturFrente;
            pic_frenteFotoCadasturVerificacaoGuia.SizeMode = PictureBoxSizeMode.Zoom;

            string cadasturVerso = _dt.Rows[0]["cadastur_verso"].ToString();
            pic_versoFotoCadasturVerificacaoGuia.ImageLocation = "C:/xampp/htdocs/valeOTour/guias/assets/" + cadasturVerso;
            pic_versoFotoCadasturVerificacaoGuia.SizeMode = PictureBoxSizeMode.Zoom;
        }

        private void btn_sairDadosGeraisVerificacaoGuia_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Deseja sair ?", "ValeOTour", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                Application.Exit();
            }
        }
    }
}
