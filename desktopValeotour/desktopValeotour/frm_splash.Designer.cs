namespace desktopValeotour
{
    partial class frm_splash
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.lbl_rolling = new System.Windows.Forms.Label();
            this.lbl_carregando = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // lbl_rolling
            // 
            this.lbl_rolling.BackColor = System.Drawing.Color.Transparent;
            this.lbl_rolling.Image = global::desktopValeotour.Properties.Resources.Rolling_1x_12;
            this.lbl_rolling.Location = new System.Drawing.Point(30, 392);
            this.lbl_rolling.Name = "lbl_rolling";
            this.lbl_rolling.Size = new System.Drawing.Size(26, 26);
            this.lbl_rolling.TabIndex = 0;
            // 
            // lbl_carregando
            // 
            this.lbl_carregando.AutoSize = true;
            this.lbl_carregando.BackColor = System.Drawing.Color.Transparent;
            this.lbl_carregando.Font = new System.Drawing.Font("Century Gothic", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbl_carregando.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(52)))), ((int)(((byte)(112)))), ((int)(((byte)(105)))));
            this.lbl_carregando.Location = new System.Drawing.Point(62, 396);
            this.lbl_carregando.Name = "lbl_carregando";
            this.lbl_carregando.Size = new System.Drawing.Size(111, 18);
            this.lbl_carregando.TabIndex = 1;
            this.lbl_carregando.Text = "Carregando...";
            // 
            // frm_splash
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::desktopValeotour.Properties.Resources.splash;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(636, 450);
            this.Controls.Add(this.lbl_carregando);
            this.Controls.Add(this.lbl_rolling);
            this.DoubleBuffered = true;
            this.Font = new System.Drawing.Font("Century Gothic", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Margin = new System.Windows.Forms.Padding(3, 4, 3, 4);
            this.Name = "frm_splash";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Splash";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label lbl_rolling;
        private System.Windows.Forms.Label lbl_carregando;
    }
}

