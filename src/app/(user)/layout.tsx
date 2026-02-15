import Footer from '@/components/Footer'
import FooterSection from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
