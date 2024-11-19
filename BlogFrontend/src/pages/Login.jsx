export default function Login() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="hidden w-1/2 h-screen lg:block">
          <img
            src="https://w.wallhaven.cc/full/jx/wallhaven-jxgvg5.jpg"
            alt="Placeholder Image"
            className="object-cover w-full h-full rounded-e-2xl"
          />
        </div>
        <div className="w-full p-8 lg:p-36 md:p-52 sm:20 lg:w-1/2">
          <h1 className="pb-10 text-3xl font-semibold text-center">
            Giriş Yap
          </h1>
          <form action="#" method="POST">
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
                type="password"
                placeholder="Şifre"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white rounded-md bg-zinc-500 hover:bg-zinc-600">
              Giriş Yap
            </button>
          </form>
          <div className="mt-6 font-semibold text-center text-zinc-800">
            <span className="mr-2 font-semibold text-black">
              Hesabınız Yok Mu?
            </span>
            <a href="/register" className="hover:text-zinc-500">
              Kayıt ol
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
