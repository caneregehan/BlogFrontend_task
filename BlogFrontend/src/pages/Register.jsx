export default function Login() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full p-8 lg:p-36 md:p-52 sm:20 lg:w-1/2">
          <h1 className="pb-10 text-3xl font-semibold text-center">Kayıt ol</h1>
          <form action="#" method="POST">
            <div className="flex gap-2">
              <div className="flex w-1/2 mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Adınız"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
                  autoComplete="off"
                />
              </div>
              <div className="flex w-1/2 mb-4">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Soyadınız"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Kullanıcı Adı"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <input
                type="mail"
                placeholder="Mail Adresi"
                id="mail"
                name="mail"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
                autoComplete="off"
                pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Şifre"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <input
                type="confirm_password"
                placeholder="Şifre Tekrar"
                id="confirm_password"
                name="confirm_password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white rounded-md bg-zinc-500 hover:bg-zinc-600">
              Kayıt Ol
            </button>
          </form>
        </div>
        <div className="hidden w-1/2 h-screen lg:block">
          <img
            src="https://w.wallhaven.cc/full/jx/wallhaven-jxgvg5.jpg"
            alt="Placeholder Image"
            className="object-cover w-full h-full rounded-e-2xl scale-x-[-1]"
          />
        </div>
      </div>
    </>
  );
}
