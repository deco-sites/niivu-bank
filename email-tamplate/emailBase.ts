export const emailBase = `
<div style="width: 500px;">
    <div style="width: 100%; height: 80px; display: flex; justify-content: start; padding: 22px 0 0 28px;">
        <img style="height: 53px; width: 179px;" src="https://s3-alpha-sig.figma.com/img/28aa/7703/d410c57f1cf60e6651f0418754bf28d9?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dnVUWGce2LGe2ciO9r9Yv0tzIE3IKKF5oOW5UiWscDdP2PSZtrhKh3Pj3xKMi9QhSUgc3unXGaQd1ZbrQHm6cB8FW6tXf6zfPvbLgveYSi50gRPs2k9ZMe65Q1i0F8xPOun3qFL0GqXIUpCKADJBdwtj-nW6ltxKfP4ndfHC0KmuJoj1pzRqMh815NUTjsOjyMxShMTTKw78aFQqnKCLW9YPN~UTuzcNhXgXdx0aOBWqd8qstvzxbJwmkSi7kFND~glu28dXYaRAw9Mo77cea7TSyzzIn5L9WGawDqm85CZeGMpcYrXnB461um7V2lbajvhNxRZ4uloLKyAd9zp0LA__" alt="Niivo Logo">
    </div>
    <div style="text-align: left; width: 100%; max-width: 100%; display: flex; justify-content: start; padding: 44px 0 56px 98px; flex-direction: column; font-family: 'Inter', sans-serif;">
        <h1 style="font-size: 32px;">Bem Vindo!</h1>
        <strong style="padding: auto; font-size: 14px; margin-bottom: 15px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis neque sed tellus venenatis.
        </strong>
        <p style="font-size: 14px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis neque sed tellus venenatis laoreet quis pretium purus. Fusce ultricies mattis nulla. Morbi a aliquet leo.</p>
        <a href="{{ .ConfirmationURL }}" style="display: flex; justify-content: center; align-items: center; width: 100%; max-width: 318px; height: 38px; text-decoration: none; background-color: #7B63FF; color: #fff; font-size: 20px; margin-top: 59px; border-radius: 3px; border: 2px solid #7B63FF;">
            Entrar no site
        </a>
    </div>
    <div style="width: 100%; min-height: 73px; background-color: #414042; font-size: 12px; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: 'Inter', sans-serif;">
        <div style="width: 88.22px; display: flex; justify-content: space-between; margin: 0 auto 8px auto;">
            <svg width="24" height="24" fill="white" viewBox="0 0 23 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M23 12.0699C23 5.7186 17.8513 0.56988 11.5 0.56988C5.14872 0.56988 0 5.7186 0 12.0699C0 17.8099 4.20538 22.5674 9.70312 23.4302V15.3941H6.7832V12.0699H9.70312V9.53629C9.70312 6.6541 11.42 5.06207 14.0468 5.06207C15.305 5.06207 16.6211 5.28668 16.6211 5.28668V8.11675H15.171C13.7424 8.11675 13.2969 9.00322 13.2969 9.91266V12.0699H16.4863L15.9765 15.3941H13.2969V23.4302C18.7946 22.5674 23 17.8099 23 12.0699Z"/></svg>
            <svg width="25" height="25" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg>
            <svg width="24" height="24" fill="white" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M16 .5C7.437.5.5 7.438.5 16S7.438 31.5 16 31.5c8.563 0 15.5-6.938 15.5-15.5S24.562.5 16 .5m7.613 10.619l-2.544 11.988c-.188.85-.694 1.056-1.4.656l-3.875-2.856l-1.869 1.8c-.206.206-.381.381-.781.381l.275-3.944l7.181-6.488c.313-.275-.069-.431-.482-.156l-8.875 5.587l-3.825-1.194c-.831-.262-.85-.831.175-1.231l14.944-5.763c.694-.25 1.3.169 1.075 1.219z"/></svg>
        </div>
        <strong style="color: white;">Acompanhe a Niivo nas redes sociais</strong>
    </div>
</div>
`;
