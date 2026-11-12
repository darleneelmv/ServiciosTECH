# Darlene López · Servicios de tecnología

Sitio estático con panel de administración en **`/entrar`** y formulario de cotización (Netlify Forms).

| Carpeta | Qué hay |
|---|---|
| `index.html`, `css/`, `js/` | La página |
| `contenido/*.json` | Todo el texto, imágenes y video. Se edita desde el panel |
| `media/` | Imágenes y videos (capturas de proyectos, video promocional) |
| `entrar/` | Panel de administración (Decap CMS) |

## Editar
Entra a `https://TU-SITIO.netlify.app/entrar/`, cambia lo que quieras y dale **Publicar**. En 1–2 minutos se ve en la página.
En los títulos, pon una palabra entre asteriscos (`Hablemos de tu *proyecto*`) para resaltarla.

## Configuración de Netlify (una sola vez)
1. **Add new project → Import an existing project → GitHub →** este repositorio. Sin comando de build; carpeta de publicación `.`
2. `https://app.netlify.com/projects/NOMBRE/configuration/identity` → **Enable Identity** → Registration: **Invite only**.
3. Ahí mismo → **Services → Git Gateway → Enable**.
4. **Invite users** con tu correo; acepta la invitación y crea tu contraseña.
5. Los mensajes del formulario llegan a **Forms** en Netlify (puedes activar aviso por correo en Forms → Notifications).
