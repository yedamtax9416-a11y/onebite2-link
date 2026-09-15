import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
};

const sections = [
  {
    heading: "1. 운영자 정보",
    body: "한입 링크는 예담세무회계(운영자: 남승원)가 운영하는 서비스입니다. 개인정보 처리에 관한 문의는 아래 연락처로 접수해 주시기 바랍니다.",
  },
  {
    heading: "2. 수집하는 개인정보 항목",
    body: "한입 링크는 회원가입 및 서비스 제공을 위해 이메일 주소, 비밀번호(또는 소셜 로그인 식별 정보)를 수집합니다. 서비스 이용 과정에서 저장하시는 폴더 및 링크 정보(URL, 제목, 설명, 썸네일)도 함께 저장됩니다.",
  },
  {
    heading: "3. 개인정보의 수집 및 이용 목적",
    body: "수집한 개인정보는 회원 식별 및 로그인, 서비스 제공 및 운영, 문의 응대, 부정 이용 방지를 위한 목적으로만 이용합니다.",
  },
  {
    heading: "4. 개인정보의 보유 및 이용 기간",
    body: "회원 탈퇴 시 또는 수집 목적 달성 시 지체 없이 파기합니다. 단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.",
  },
  {
    heading: "5. 개인정보의 제3자 제공",
    body: "이용자의 개인정보는 원칙적으로 외부에 제공되지 않습니다. 다만 법령에 근거가 있거나 이용자가 사전에 동의한 경우에는 예외로 합니다.",
  },
  {
    heading: "6. 이용자의 권리",
    body: "이용자는 언제든지 자신의 개인정보를 조회, 수정하거나 회원 탈퇴를 통해 삭제를 요청할 수 있습니다.",
  },
];

const contact = {
  operator: "예담세무회계 (남승원)",
  email: "nsw30@naver.com",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <main className="bg-mesh flex flex-1 justify-center px-4 py-10">
        <div className="flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-zinc-200/70 bg-white p-8 shadow-xl shadow-zinc-200/60">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="gradient-bg flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md shadow-indigo-500/30">
                한
              </span>
              <span className="gradient-text text-xl font-extrabold tracking-tight">
                한입 링크
              </span>
            </Link>
            <h1 className="mt-4 text-2xl font-extrabold text-zinc-900">
              개인정보 처리방침
            </h1>
          </div>

          <div className="flex flex-col gap-5">
            {sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-1.5">
                <h2 className="text-sm font-semibold text-zinc-800">
                  {section.heading}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {section.body}
                </p>
              </section>
            ))}

            <section className="flex flex-col gap-1.5">
              <h2 className="text-sm font-semibold text-zinc-800">
                7. 문의처
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600">
                개인정보 처리에 관한 문의사항은 아래 연락처로 접수해 주시기
                바랍니다.
                <br />
                운영자: {contact.operator}
                <br />
                이메일:{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  {contact.email}
                </a>
              </p>
            </section>
          </div>

          <Link
            href="/"
            className="text-center text-xs font-semibold text-indigo-600 hover:underline"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
